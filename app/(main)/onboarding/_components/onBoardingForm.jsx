"use client"
import { React, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { onBoardingSchema } from '../../../lib/schema'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../../components/ui/card'
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../../../components/ui/select'
import { Label } from '../../../../components/ui/label'
import { industries } from '../../../../data/industry'
import { Input } from '../../../../components/ui/input'
import { number } from 'zod'
import { Textarea } from '../../../../components/ui/textarea'
import { Button } from '../../../../components/ui/button'
import { updateUser } from '../../../../actions/user'
import useFetch from '../../../../hooks/useFetch'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const onBoardingForm = () => {  

    const [selectedIndustries, setselectedIndustries] = useState(null);
    const router = useRouter();

    const {data:updateData,
        loading:updateLoading,
        error:updateError,
        fetchData
    }=useFetch(updateUser)
        
    const { register, handleSubmit, formState: { errors },
        setValue, watch } = useForm({
            resolver: zodResolver(onBoardingSchema),
        })
        const watchIndustry=watch("industry")

        const onSubmit =async(val)=>{
           try {
            const formatedIndustry=`${val.industry} - ${val.subIndustry}.toLowerCase()
            .replace(/ /g,"-")`
            await fetchData({...val, industry: formatedIndustry})
            
           } catch (error) {
            console.log("Error in onboarding form",error);
            
           }
            
        };
        useEffect(()=>{
            if(updateData?.success && !updateLoading ){
                toast.success("Profile updated successfully")
                router.push("/dashboard");
                router.refresh();
            }
        },[updateData,updateLoading])

    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
            <Card className="w-full max-w-4xl rounded-2xl shadow-2xl bg-gray-500/30 backdrop-blur-md border border-gray-700 transition duration-300 hover:shadow-purple-500/20">
                <CardHeader className="space-y-3 border-b border-gray-700 pb-4 sm:pb-6 px-4 sm:px-6 md:px-8">
                    <CardTitle className="text-2xl sm:text-3xl font-bold text-white">Complete Your Profile</CardTitle>
                    <CardDescription className="text-sm sm:text-base text-gray-400">Tell us about your professional background to help us personalize your experience.</CardDescription>
                </CardHeader>
                <CardContent className="text-gray-300 space-y-4 sm:space-y-6 pt-4 sm:pt-6 px-4 sm:px-6 md:px-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            <div className='space-y-2 sm:space-y-3'>
                                <Label htmlFor="industry" className="text-sm sm:text-base font-medium text-gray-200">Industry</Label>
                                <Select
                                    onValueChange={(value) => {
                                        setValue("industry", value)
                                        setselectedIndustries(
                                            industries.find((ind) => ind.name === value)
                                        )
                                        setValue("subIndustry", "")
                                    }}
                                >
                                    <SelectTrigger className="h-10 sm:h-11 bg-gray-700 border-gray-600 text-gray-200 text-sm sm:text-base" id="industry">
                                        <SelectValue placeholder="Select your industry" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-800 border-gray-700">
                                        {industries.map((industry) => (
                                            <SelectItem key={industry.id} value={industry.name} className="text-sm sm:text-base text-gray-200 hover:bg-gray-700">
                                                {industry.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.industry && (
                                    <p className="text-xs sm:text-sm text-red-400 mt-1">
                                        {errors.industry.message}
                                    </p>
                                )}
                            </div>

                            {watchIndustry && 
                            <div className='space-y-2 sm:space-y-3'>
                                <Label htmlFor="subIndustry" className="text-sm sm:text-base font-medium text-gray-200">Specialization</Label>
                                <Select
                                    onValueChange={(value) => {
                                        setValue("subIndustry", value)
                                    }}
                                >
                                    <SelectTrigger className="h-10 sm:h-11 bg-gray-700 border-gray-600 text-gray-200 text-sm sm:text-base" id="subIndustry">
                                        <SelectValue placeholder="Select your specialization" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-800 border-gray-700">
                                        {selectedIndustries?.subIndustries.map((industry) => (
                                            <SelectItem key={industry} value={industry} className="text-sm sm:text-base text-gray-200 hover:bg-gray-700">
                                                {industry}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.subIndustry && (
                                    <p className="text-xs sm:text-sm text-red-400 mt-1">
                                        {errors.subIndustry.message}
                                    </p>
                                )}
                            </div>
                            }
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            <div className='space-y-2 sm:space-y-3'>
                                <Label htmlFor="experience" className="text-sm sm:text-base font-medium text-gray-200">Years of Experience</Label>
                                <Input
                                    id='experience'
                                    type="number"
                                    min="0"
                                    max="50"
                                    className="h-10 sm:h-11 bg-gray-700 border-gray-600 text-gray-200 placeholder:text-gray-400 text-sm sm:text-base"
                                    placeholder="Enter your years of experience"
                                    {...register("experience")}
                                />
                                {errors.experience && (
                                    <p className="text-xs sm:text-sm text-red-400 mt-1">
                                        {errors.experience.message}
                                    </p>
                                )}
                            </div>

                            <div className='space-y-2 sm:space-y-3'>
                                <Label htmlFor="skills" className="text-sm sm:text-base font-medium text-gray-200">Skills</Label>
                                <Input
                                    id='skills'
                                    className="h-10 sm:h-11 bg-gray-700 border-gray-600 text-gray-200 placeholder:text-gray-400 text-sm sm:text-base"
                                    placeholder="e.g., Python, JavaScript, React"
                                    {...register("skills")}
                                />
                                <p className="text-xs sm:text-sm text-gray-400">
                                    Separate multiple skills with commas
                                </p>
                                {errors.skills && (
                                    <p className="text-xs sm:text-sm text-red-400 mt-1">
                                        {errors.skills.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className='space-y-2 sm:space-y-3'>
                            <Label htmlFor="bio" className="text-sm sm:text-base font-medium text-gray-200">Professional Bio</Label>
                            <Textarea
                                id='bio'
                                className="min-h-[100px] sm:min-h-[120px] resize-none bg-gray-700 border-gray-600 text-gray-200 placeholder:text-gray-400 text-sm sm:text-base"
                                placeholder="Share your professional journey, achievements, and aspirations..."
                                {...register("bio")}
                            />
                            {errors.bio && (
                                <p className="text-xs sm:text-sm text-red-400 mt-1">
                                    {errors.bio.message}
                                </p>
                            )}
                        </div>
                      
                        <Button 
                            disabled={updateLoading}
                            type="submit" 
                            className="w-full h-10 sm:h-11 text-sm sm:text-base font-medium bg-purple-600 hover:bg-purple-700 text-white transition-colors"
                        >
                            {updateLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                "Complete Profile"
                            )}
                        </Button>
                      
                    </form>
                </CardContent>
            </Card> 
        </div>
    )
}

export default onBoardingForm
