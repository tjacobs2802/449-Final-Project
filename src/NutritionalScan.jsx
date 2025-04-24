import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NutritionalScan.css';
import Navbar from './navbar.jsx';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Search, CheckCircle, AlertTriangle } from 'lucide-react';
import { cn } from "@/lib/utils";

import { createClient } from '@supabase/supabase-js';
// import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

const NUTRITIONIX_API_KEY = '7885b37e01eaaf56004dc57f44556af0';
const NUTRITIONIX_APP_ID = '04660f3c';
const NUTRITIONIX_BASE_URL = 'https://trackapi.nutritionix.com/v2';

const supabaseUrl = 'https://vhzmoieunypoledibcqa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoem1vaWV1bnlwb2xlZGliY3FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NjYwMTMsImV4cCI6MjA2MDI0MjAxM30.qLvewkSAwcmg5-7mH10RMz2wGCUlmkz19P00nYjtuzY';

// function NutriScan() {
//     const navigate = useNavigate();
    
//     const [searchType, setSearchType] = useState('barcode');
//     const [searchValue, setSearchValue] = useState('');
//     const [productInfo, setProductInfo] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState({ type: null, text: '' });

//     const [supabase, setSupabase] = useState(null);
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         const initSupabase = async () => {
//             try {
//                 //  Use the variables from import.meta.env
//                 const supabaseUrl =  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vhzmoieunypoledibcqa.supabase.co'; //removed import.meta
//                 const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoem1vaWV1bnlwb2xlZGliY3FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NjYwMTMsImV4cCI6MjA2MDI0MjAxM30.qLvewkSAwcmg5-7mH10RMz2wGCUlmkz19P00nYjtuzY';  //removed import.meta


//                 if (!supabaseUrl) {
//                     throw new Error("NEXT_PUBLIC_SUPABASE_URL is not defined in your environment.");
//                 }
//                 if (!supabaseKey) {
//                     throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined in your environment.");
//                 }
//                 const supabaseClient = createClient(
//                     supabaseUrl,
//                     supabaseKey
//                 );
//                 setSupabase(supabaseClient);
//                 const { data: { user: currentUser } } = await supabaseClient.auth.getUser();
//                 setUser(currentUser);
//             } catch (error) {
//                 console.error("Error initializing Supabase or getting user:", error);
//                 setMessage({ type: 'error', text: 'Failed to initialize or get user data. ' + error.message });
//             }
//         };
//         initSupabase();
//     }, []);

//     const fetchProductInfo = async (type, value) => {
//         if (!NUTRITIONIX_API_KEY || !NUTRITIONIX_APP_ID) {
//             throw new Error('Nutritionix API key and app ID are not configured.  See the code.');
//         }

//         const headers = {
//             'x-app-id': NUTRITIONIX_APP_ID,
//             'x-app-key': NUTRITIONIX_API_KEY,
//             'Content-Type': 'application/json',
//         };

//         if (type === 'barcode') {
//             const url = `${NUTRITIONIX_BASE_URL}/search/item?upc=${value}`;
//             const response = await fetch(url, {
//                 method: 'GET',
//                 headers: headers,
//             });

//             if (!response.ok) {
//                 if (response.status === 404) {
//                     throw new Error('Product not found for this barcode.');
//                 }
//                 throw new Error(`Error: ${response.status} - ${response.statusText}`);
//             }
//             const data = await response.json();

//             if (data.foods && data.foods.length > 0) {
//                 // Get the first food item.
//                 const food = data.foods[0];
//                 return [{
//                     product_name: food.food_name,
//                 }];
//             }
//             else {
//                 throw new Error("Product not found");
//             }

//         } else if (type === 'food') {
//             const url = `${NUTRITIONIX_BASE_URL}/search/instant?query=${encodeURIComponent(value)}`;
//             const response = await fetch(url, {
//                 method: 'GET',
//                 headers: headers,
//             });

//             if (!response.ok) {
//                 if (response.status === 404) {
//                     throw new Error('Product not found for this food name');
//                 }
//                 throw new Error(`Error: ${response.status} - ${response.statusText}`);
//             }
//             const data = await response.json();
//             // In instant search, data.common holds the food items.  data.branded is for specific brands.
//             let foods = [];
//             if (data.common && data.common.length > 0) {
//                 foods = data.common.map(food => ({
//                     food_name: food.food_name,
//                     food_type: 'common'
//                 }));
//             }

//             if (foods.length === 0) {
//                 throw new Error('Food not found');
//             }
//             return foods;

//         } else {
//             throw new Error('Invalid search type');
//         }
//     };

//     const fetchNutrientInfo = async (foodId, foodType) => {
//         const headers = {
//             'x-app-id': NUTRITIONIX_APP_ID,
//             'x-app-key': NUTRITIONIX_API_KEY,
//             'Content-Type': 'application/json',
//         };
//         let url = '';
//         if (foodType === 'common') {
//             url = `${NUTRITIONIX_BASE_URL}/nutrition?query=${encodeURIComponent(foodId)}`;
//         } else {
//             url = `${NUTRITIONIX_BASE_URL}/foods/${foodId}`;
//         }

//         const response = await fetch(url, {
//             method: 'GET',
//             headers: headers,
//         });
//         if (!response.ok) {
//             throw new Error(`Failed to fetch nutrition for ${foodId}. Status: ${response.status}`);
//         }
//         const data = await response.json();
//         if (foodType === 'common') {
//             return data.foods[0].full_nutrients.reduce((acc, nutrient) => {
//                 acc[nutrient.attr_id] = nutrient.value;
//                 return acc;
//             }, {});
//         }
//         else {
//             return data.foods[0].full_nutrients.reduce((acc, nutrient) => {
//                 acc[nutrient.attr_id] = nutrient.value;
//                 return acc;
//             }, {});
//         }

//     };

//     const fetchNutrientsFromNatural = async (query) => {
//         const headers = {
//             'x-app-id': NUTRITIONIX_APP_ID,
//             'x-app-key': NUTRITIONIX_API_KEY,
//             'Content-Type': 'application/json',
//         };
//         const url = `${NUTRITIONIX_BASE_URL}/natural/nutrients`;

//         const response = await fetch(url, {
//             method: 'POST',
//             headers: headers,
//             body: JSON.stringify({ query: query }),
//         });

//         if (!response.ok) {
//             throw new Error(`Failed to fetch nutrients from natural input. Status: ${response.status}`);
//         }
//         const data = await response.json();
//         return data;
//     };

//     const saveProductInfo = async (data, userId) => {
//         if (!supabase) {
//             throw new Error('Supabase client is not initialized.');
//         }
//         if (!userId) {
//             throw new Error('User ID is required to save data.');
//         }

//         try {
//             const { error } = await supabase
//                 .from('entries') // Changed table name to "entries"
//                 .insert(data.map((item) => {
//                     const {
//                         search_type,
//                         search_value,
//                         product_name,

//                         ...nutrients // Destructure nutrients
//                     } = item;
//                     return {
//                         user_id: userId,
//                         label_name: product_name, // Changed to label_name
//                         calorie_amount: nutrients[208] || 0,
//                         protein_amount: nutrients[203] || 0,
//                         sugar_amount: nutrients[269] || 0,
//                         calcium_amount: nutrients[301] || 0,
//                         search_type: search_type,
//                         search_value: search_value
//                         // Add other nutrients as needed, mapping from Nutritionix ID to your column names
//                     };
//                 }));

//             if (error) {
//                 console.error("Supabase error:", error);
//                 throw new Error('Failed to save data to Supabase.');
//             }
//             setMessage({ type: 'success', text: 'Scan saved successfully!' });
//         } catch (error) {
//             setMessage({ type: 'error', text: error.message || 'Failed to save scan.' });
//             console.error("Error saving to Supabase", error)
//             throw error; // rethrow
//         }
//     };



//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setMessage({ type: null, text: '' }); // Clear previous message
//         setProductInfo(null);

//         if (!user) {
//             setMessage({ type: 'error', text: 'Please log in to save your scans.' });
//             setLoading(false);
//             return;
//         }


//         try {
//             if (searchType === 'natural') {
//                 const naturalResult = await fetchNutrientsFromNatural(searchValue);

//                 let productsWithNutrients = naturalResult.foods.map(food => {
//                     const nutrients = food.full_nutrients.reduce((acc, nutrient) => {
//                         acc[nutrient.attr_id] = nutrient.value;
//                         return acc;
//                     }, {});
//                     return {
//                         product_name: food.food_name,
//                         search_type: 'natural',
//                         search_value: searchValue,
//                         ...nutrients,
//                     };
//                 });

//                 // Apply food type preference
//                 // if (foodTypePreference !== 'all') {
//                 productsWithNutrients = productsWithNutrients.filter(food => {
//                     //  The natural endpoint doesn't label food_type, so we have to assume
//                     //  it could be either, and filter as best we can.
//                     // For now, we'll assume if the search type is natural, we want common.
//                     return true;
//                 });
//                 // }

//                 setProductInfo(productsWithNutrients);
//                 await saveProductInfo(productsWithNutrients, user.id);
//                 setMessage({ type: 'success', text: 'Scan saved successfully!' });
//                 setSearchValue('');
//             }
//             else {
//                 const products = await fetchProductInfo(searchType, searchValue); // Now gets an array

//                 // Fetch nutrients for each product
//                 let productsWithNutrients = await Promise.all(
//                     products.map(async (product) => {
//                         let nutrientData;
//                         if (searchType === 'food') {
//                             try {
//                                 nutrientData = await fetchNutrientInfo(product.food_name, product.food_type);
//                             }
//                             catch (err) {
//                                 console.error("Error fetching nutrients:", err)
//                                 nutrientData = {};
//                             }
//                         }
//                         return {
//                             ...product,
//                             search_type: searchType,
//                             search_value: searchValue,
//                             ...nutrientData, // Merge nutrient data
//                         };
//                     })
//                 );

//                 // Apply food type preference
//                 // if (foodTypePreference !== 'all') {
//                 productsWithNutrients = productsWithNutrients.filter(food => {
//                     return food.food_type === 'common';
//                 });
//                 // }
//                 setProductInfo(productsWithNutrients);

//                 // Save to Supabase, passing the enriched product data
//                 await saveProductInfo(productsWithNutrients, user.id);
//                 setMessage({ type: 'success', text: 'Scan saved successfully!' });
//                 setSearchValue(''); // Reset the form
//             }

//         } catch (err) {
//             setMessage({ type: 'error', text: err.message || 'An error occurred.' });

//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         // if (user) {
//         //     console.log("Logged in user ID:", user.id)
//         // }
//     }, [])

//     return (
//         <>
//             <Navbar />
//             <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
//                 <div className="max-w-3xl mx-auto space-y-6">
//                     <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center">
//                         NutriScan
//                     </h1>

//                     <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 bg-white rounded-lg p-6 shadow-md">
//                         <div className="space-y-2">
//                             <Label htmlFor="search-type" className="text-gray-700">Search By</Label>
//                             <Select
//                                 onValueChange={(value) => setSearchType(value)}
//                                 defaultValue={searchType}
//                             >
//                                 <SelectTrigger id="search-type" className="w-full bg-white border-gray-300">
//                                     <SelectValue placeholder="Select search type" className="text-gray-900" />
//                                 </SelectTrigger>
//                                 <SelectContent className="bg-white border-gray-300">
//                                     <SelectItem value="barcode" className="hover:bg-gray-100 hover:text-gray-900">Barcode (UPC)</SelectItem>
//                                     <SelectItem value="food" className="hover:bg-gray-100 hover:text-gray-900">Food Name</SelectItem>
//                                     <SelectItem value="natural" className="hover:bg-gray-100 hover:text-gray-900">Natural Language</SelectItem>
//                                 </SelectContent>
//                             </Select>
//                         </div>

//                         <div className="space-y-2">
//                             <Label htmlFor="search-value" className="text-gray-700">
//                                 {searchType === 'barcode' ? 'Barcode (UPC)' :
//                                     searchType === 'food' ? 'Food Name' :
//                                         'Enter food and quantity (e.g., 1 egg and 1 cup of milk)'}
//                             </Label>
//                             <Input
//                                 id="search-value"
//                                 type="text"
//                                 value={searchValue}
//                                 onChange={(e) => setSearchValue(e.target.value)}
//                                 placeholder={searchType === 'barcode' ? 'Enter barcode' :
//                                     searchType === 'food' ? 'Enter food name' :
//                                         'Enter food and quantity'}
//                                 className="w-full bg-white border-gray-300 text-gray-900"
//                                 disabled={loading}
//                             />
//                         </div>

//                         <Button
//                             type="submit"
//                             className={cn(
//                                 "w-full flex items-center justify-center gap-2",
//                                 "bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5",
//                                 "transition-colors duration-300 rounded-md shadow-md",

//                             )}
//                             disabled={loading}
//                         >
//                             <Search className="w-5 h-5" />
//                             Search
//                         </Button>
//                     </form>

//                     {message.type && (
//                         <div
//                             className={cn(
//                                 "p-4 rounded-md flex items-start gap-2",
//                                 message.type === 'success'
//                                     ? "bg-green-500/10 border border-green-400 text-green-400"
//                                     : "bg-red-500/10 border border-red-400 text-red-400"
//                             )}
//                         >
//                             {message.type === 'success' ? (
//                                 <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
//                             ) : (
//                                 <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
//                             )}
//                             <span>
//                                 {message.text}
//                             </span>
//                         </div>
//                     )}

//                     {productInfo && Array.isArray(productInfo) && ( //check if productInfo is an array
//                         <div className="bg-white border border-gray-200 p-4 sm:p-6 rounded-lg shadow-md space-y-4">
//                             <h2 className="text-xl font-semibold text-gray-900">Product Information</h2>
//                             {productInfo.map((product, index) => {
//                                 // Display nutrients
//                                 const nutrientKeys = Object.keys(product).filter(key =>
//                                     ![
//                                         'search_type',
//                                         'search_value',
//                                         'product_name',
//                                         'food_type'
//                                     ].includes(key)
//                                 );
//                                 return (
//                                     <div key={index} className="flex flex-col sm:flex-row items-start gap-4 mb-4">
//                                         {/* <img
//                                             src={product.image_url}
//                                             alt={product.product_name}
//                                             className="w-48 h-48 rounded-md object-cover"
//                                             loading="lazy"
//                                         /> */}
//                                         <div>
//                                             <p className="text-lg font-medium text-gray-900">{product.product_name}</p>
//                                             <div className='mt-4'>
//                                                 <h4 className='font-semibold'>Nutrients</h4>
//                                                 {nutrientKeys.length > 0 ? (
//                                                     <ul className="list-disc list-inside">
//                                                         {nutrientKeys.map(key => (
//                                                             <li key={key}>
//                                                                 {key}: {product[key]}
//                                                             </li>
//                                                         ))}
//                                                     </ul>
//                                                 ) : (
//                                                     <p>No nutrient information available.</p>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )
//                             })}
//                         </div>
//                     )}
//                 </div>
//             </div>
//             <button onClick={() => navigate('/')}>Go to Home Page</button>
//         </>
//     );
// };

const NutriScan = () => {
    const [supabase, setSupabase] = useState(null);
    const [message, setMessage] = useState({ type: null, text: '' });
    // const [user, setUser] = useState(null);  Removed user

    useEffect(() => {
        const initSupabase = async () => {
            try {
                // const supabaseUrl = 'https://vhzmoieunypoledibcqa.supabase.co';
                // const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoem1vaWV1bnlwb2xlZGliY3FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NjYwMTMsImV4cCI6MjA2MDI0MjAxM30.qLvewkSAwcmg5-7mH10RMz2wGCUlmkz19P00nYjtuzY';

                // if (!supabaseUrl) {
                //     throw new Error("NEXT_PUBLIC_SUPABASE_URL is not defined in your environment.");
                // }
                // if (!supabaseKey) {
                //     throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined in your environment.");
                // }

                const supabaseClient = createClient(supabaseUrl, supabaseKey);
                setSupabase(supabaseClient);
                // const { data: { user: currentUser } } = await supabaseClient.auth.getUser();  Removed user
                // setUser(currentUser);

            } catch (error) {
                console.error("Error initializing Supabase:", error);
                setMessage({ type: 'error', text: 'Failed to initialize Supabase. ' + error.message });
            }
        };
        initSupabase();
    }, []);

    const handleInsert = async () => {
        if (!supabase) {
            setMessage({ type: 'error', text: 'Supabase is not initialized.' });
            return;
        }
        // if (!user) {  Removed user check
        //     setMessage({ type: 'error', text: 'Please log in to save data.' });
        //     return;
        // }

        try {
            const { error } = await supabase
                .from('entries') // Use your table name here
                .insert({
                    label_name: 'Test Product',
                    user_id: '9f2e45bb-71f4-427e-8671-7614a9c2ea23', //  Removed user.id and hardcoded a test user.  Important:  Use a valid user ID from your database for testing.
                    calorie_amount: 120,
                    protein_amount: 15,
                },
                { upsert: false } // Explicitly set upsert to false
                );

            if (error) {
                console.error("Supabase error:", error);
                throw new Error('Failed to insert data: ' + error.message);
            }
            setMessage({ type: 'success', text: 'Data inserted successfully!' });
        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        }
    };

    return (
        <>
        <Navbar />
        <div className="min-h-screen p-4 sm:p-8 flex items-center justify-center">
            <div className="max-w-md w-full space-y-6 bg-white rounded-lg p-6 shadow-md">
                <h1 className="text-2xl font-bold text-gray-900 text-center">
                    Supabase Insert Test
                </h1>
                <Button
                    onClick={handleInsert}
                    className={cn(
                        "w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5",
                        "transition-colors duration-300 rounded-md shadow-md",
                    )}
                >
                    Insert Test Data
                </Button>
                {message.type && (
                    <div
                        className={cn(
                            "p-4 rounded-md flex items-start gap-2",
                            message.type === 'success'
                                ? "bg-green-500/10 border border-green-400 text-green-400"
                                : "bg-red-500/10 border border-red-400 text-red-400"
                        )}
                    >
                        {message.type === 'success' ? (
                            <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        ) : (
                            <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        )}
                        <span>
                            {message.text}
                        </span>
                    </div>
                )}
            </div>
        </div>
        </>
    );
};

export default NutriScan;
