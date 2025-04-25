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

    const [searchType, setSearchType] = useState('food');
    const [searchValue, setSearchValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [type, setType] = useState('food');
    const [input, setInput] = useState('');


    const fetchProductInfo = async (type, value) => {
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
                // console.log("Trying Natural Language");

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
                console.log("Full response:", data);

                return data;

            } else if (type === 'barcode') {
                // console.log("Trying Barcode");

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
                console.log("Full response:", data);
                return data;

            } else {
                throw new Error('Invalid search type.');
            }

        } catch (error) {
            console.error("Error fetching product info:", error);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await fetchProductInfo(searchType, searchValue);

        if (data) {
            setErrorMessage('');
        }

        if (data?.foods?.length > 0) {
            const { error: insertError } = await supabase
                .from('entries')
                .insert(
                    data.foods.map(food => ({ // Map the food items
                        user_id: '9f2e45bb-71f4-427e-8671-7614a9c2ea23', // Hardcoded user_id value
                        food_name: food.food_name,
                        calories: Math.round(food.nf_calories),
                        protein: Math.round(food.nf_protein),
                        sugar: Math.round(food.nf_sugars),
                        total_fat: Math.round(food.nf_total_fat),
                        serving_qty: Math.round(food.serving_qty),
                    }))
                );
        }

        setSearchValue('');
    };

    return (
        <>
            <Navbar />

            <form onSubmit={handleSubmit} className="max-w-md w-[350px] mx-auto bg-gray-50 shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
                    <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        <Search className="mr-2 h-4 w-4" /> Submit
                    </Button>
                </div>
                {errorMessage && (<h3 className="block text-gray-700 text-xl font-bold mb-2 errorMessage">{ errorMessage }</h3>)}
            </form>

            <button onClick={() => navigate("/")} className="text-white-500 text-sm mt-4">
                Go to Home Page
            </button>
        </>
    );
};



export default NutriScan;
