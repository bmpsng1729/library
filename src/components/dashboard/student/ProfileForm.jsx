import React from 'react';
import { Input, Select } from '../../index';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';

function ProfileForm() {
    const { register, handleSubmit } = useForm();
    const dbCall = async (data) => {
        try {
            // make a db call async
            const response = await axios.patch("/api/v1/auth/student/update-profile", data, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            //show a toast if hit is successfull
            console.log("update-profile data", data);
            console.log("response of updated profile", response.data.success);
            if(response.data.success){
                toast.success(response.data.message || "profile updated");
            }
        } catch (err) {
            console.log("error in profile updation",err)
        }
    }

    return (
        <div className="flex justify-center items-start mt-10 px-4">
            <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-8">
                <h1 className="text-2xl font-semibold text-center mb-6">Profile Registration Form</h1>
                <form className="space-y-5" onSubmit={handleSubmit(dbCall)}>
                    <Select
                        label="Gender"
                        options={["male", "female", "other"]}
                        {...register("gender")}
                    />
                    <Input
                        label="Instagram ID"
                        placeholder="Enter Instagram ID"
                        {...register("instagramId")}
                    />
                    <Input
                        label="Address"
                        placeholder="Enter Address"
                        {...register("address")}
                    />
                    <Input
                        label="City"
                        placeholder="Enter City"
                        {...register("city")}
                    />
                    <Input
                        label="Aadhar Number"
                        placeholder="Enter Aadhar Number"
                        {...register("aadhar", { required: true })}
                    />

                    <button
                        type="submit"
                        className="w-full py-2 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ProfileForm;
