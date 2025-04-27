import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './NutritionalScan.css';

import Navbar from './navbar.jsx';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';


import { supabase } from './supabaseClient';
// import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

const NUTRITIONIX_API_KEY = '7885b37e01eaaf56004dc57f44556af0';
const NUTRITIONIX_APP_ID = '04660f3c';
const NUTRITIONIX_BASE_URL = 'https://trackapi.nutritionix.com/v2';


const NutriScan = () => {
    const navigate = useNavigate();

    const [entryType, setEntryType] = useState('lookup');   // Lookup and Manual

    const [searchType, setSearchType] = useState('food');   // Food and Barcode
    const [searchValue, setSearchValue] = useState('');     // UPC or Natural Languange input
    const [errorMessage, setErrorMessage] = useState('');

    const [manualFoodName, setManualFoodName] = useState('');
    const [manualCalories, setManualCalories] = useState('');
    const [manualProtein, setManualProtein] = useState('');
    const [manualSugar, setManualSugar] = useState('');
    const [manualFat, setManualFat] = useState('');


    const fetchFoodData = async (type, value) => {
        try {
            if (!NUTRITIONIX_API_KEY || !NUTRITIONIX_APP_ID) {
                throw new Error('Nutritionix API key and app ID are not configured.');
            }

            const headers = {
                'x-app-id': NUTRITIONIX_APP_ID,
                'x-app-key': NUTRITIONIX_API_KEY,
                'Content-Type': 'application/json',
            };

            let url = '';
            if (type === 'food') {
                url = `${NUTRITIONIX_BASE_URL}/natural/nutrients`;
                const postBody = {
                    query: value
                }

                const response = await fetch(url, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(postBody)
                });

                if (!response.ok) {
                    setErrorMessage("Food not Found");
                    throw new Error(`Nutritionix API error: ${response.status} - ${response.statusText}`);
                }

                const data = await response.json();

                return data;

            } else if (type === 'barcode') {
                url = `${NUTRITIONIX_BASE_URL}/search/item?upc=${value}`;
                
                const response = await fetch(url, {
                    method: 'GET',
                    headers: headers
                });

                if (!response.ok) {
                    setErrorMessage("Barcode Not Found");
                    throw new Error(`Nutritionix API error: ${response.status} - ${response.statusText}`);
                }

                const data = await response.json();
                return data;

            } else {
                throw new Error('Invalid search type.');
            }

        } catch (error) {
            setErrorMessage('Error');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (entryType === 'lookup') {
            try {

                const data = await fetchFoodData(searchType, searchValue);

                if (data && data.foods.length > 0) {
                    let totalCalories = 0;
                    let totalProtein = 0;
                    let totalSugar = 0;
                    let totalFat = 0;
        
                    for (const food of data.foods) {
                        totalCalories += food.nf_calories || 0;
                        totalProtein += food.nf_protein || 0;
                        totalSugar += food.nf_sugars || 0;
                        totalFat += food.nf_total_fat || 0;
                    }


                    setManualFoodName(searchValue);
                    setManualCalories(Math.round(totalCalories));
                    setManualProtein(Math.round(totalProtein));
                    setManualSugar(Math.round(totalSugar));
                    setManualFat(Math.round(totalFat));

                    setEntryType('manual');
                    setErrorMessage('');
                } else {
                    setErrorMessage('Error fetching data');
                }
            } catch (error) {
                setErrorMessage('Error fetching data.');
            }
        } else if (entryType === 'manual') {
            if (
                manualFoodName !== '' &&
                manualCalories !== '' &&
                manualProtein !== '' &&
                manualSugar !== '' &&
                manualFat !== ''
            ) {

                try {
                    
                    const { error: insertError } = await supabase
                        .from('entries')
                        .insert([
                            {
                        
                                user_id: '9f2e45bb-71f4-427e-8671-7614a9c2ea23', // Hardcoded user_id value
                                food_name: manualFoodName,
                                calories: manualCalories,
                                protein: manualProtein,
                                sugar: manualSugar,
                                total_fat: manualFat,
                            }
                        ]);


                    setManualFoodName('');
                    setManualCalories('');
                    setManualProtein('');
                    setManualSugar('');
                    setManualFat('');

                    setEntryType('lookup');
                    setErrorMessage('');    


                } catch (error) {
                    setErrorMessage('Error sending data to table.');
                }
            } else{
                setErrorMessage('Please fill in all the fields.');
            }
        }
    } 

    return (
        <>
            <Navbar />
            <p className='poetsen-font text-4xl text-orange mb-10'>Input Food Label Data in One of the Following Options:</p>
            <form onSubmit={handleSubmit} className="max-w-md w-[350px]  mx-auto bg-gray-50 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <Label className="block text-gray-700 text-sm font-bold mb-2">Entry Type</Label>
                    <Select value={entryType} onValueChange={setEntryType}>
                        <SelectTrigger className="w-full py-2 px-3 text-gray-700 rounded border border-gray-300 shadow-sm focus:outline-none focus:ring-2">
                            <SelectValue placeholder="Select entry type" />
                        </SelectTrigger>
                        <SelectContent className=" bg-gray-50 text-black">
                            <SelectItem value="lookup">Lookup</SelectItem>
                            <SelectItem value="manual">Manual Entry</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {entryType === 'lookup' && (
                    <>
                        <div className="mb-4">
                            <Label className="block text-gray-700 text-sm font-bold mb-2"> Search By</Label>
                            <Select value={searchType} onValueChange={setSearchType}>
                                <SelectTrigger className="w-full py-2 px-3 text-gray-700 rounded border border-gray-300 shadow-sm focus:outline-none focus:ring-2">
                                    <SelectValue placeholder="Select search type" />
                                </SelectTrigger>
                                <SelectContent className=" bg-gray-50 text-black">
                                    <SelectItem value="barcode">Barcode</SelectItem>
                                    <SelectItem value="food">Natural Language</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="mb-6">
                            <Label htmlFor="searchValue" className="block text-gray-700 text-sm font-bold mb-2">
                                {searchType === 'barcode' ? 'Barcode' : 'Food Name'}
                            </Label>
                            <Input
                                id="searchValue"
                                type="text"
                                placeholder={searchType === 'barcode' ? 'Enter barcode' : 'Enter food name (e.g., chicken breast)'}
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="flex items-center justify-center">
                            <Button type="submit" className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline submit-button">
                                <Search className="mr-2 h-4 w-4" /> Lookup
                            </Button>
                        </div>
                    </>
                )}

                {entryType === 'manual' && (
                    <>
                        <div className="mb-4">
                            <Label htmlFor="foodName" className="block text-gray-700 text-sm font-bold mb-2">
                                Food Name
                            </Label>
                            <Input
                                id="foodName"
                                type="text"
                                placeholder="Enter Food Name Here"
                                value={manualFoodName}
                                onChange={(e) => setManualFoodName(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="mb-4">
                            <Label htmlFor="calories" className="block text-gray-700 text-sm font-bold mb-2">
                                Calories (kCal)
                            </Label>
                            <Input
                                id="calories"
                                type="number"
                                placeholder="Enter number of calories"
                                value={manualCalories}
                                onChange={(e) => setManualCalories(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="mb-4">
                            <Label htmlFor="protein" className="block text-gray-700 text-sm font-bold mb-2">
                                Protein (g)
                            </Label>
                            <Input
                                id="protein"
                                type="number"
                                placeholder="Enter grams of protein"
                                value={manualProtein}
                                onChange={(e) => setManualProtein(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="mb-4">
                            <Label htmlFor="sugar" className="block text-gray-700 text-sm font-bold mb-2">
                                Sugar Amount (g)
                            </Label>
                            <Input
                                id="sugar"
                                type="number"
                                placeholder="Enter grams of sugar"
                                value={manualSugar}
                                onChange={(e) => setManualSugar(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="mb-4">
                            <Label htmlFor="fat" className="block text-gray-700 text-sm font-bold mb-2">
                                Fat Amount (g)
                            </Label>
                            <Input
                                id="fat"
                                type="number"
                                placeholder="Enter grams of fat"
                                value={manualFat}
                                onChange={(e) => setManualFat(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="flex items-center justify-center">
                            <Button type="submit" className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline submit-button">
                                Submit Entry
                            </Button>
                        </div>
                    </>
                )}

                {errorMessage && (<h3 className="block text-gray-700 text-xl font-bold mb-2 errorMessage">{errorMessage}</h3>)}
            </form>

        </>
    );
};



export default NutriScan;
