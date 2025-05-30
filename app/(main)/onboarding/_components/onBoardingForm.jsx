"use client"
import { React, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { onBoardingSchema } from '../../../lib/schema'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../../components/ui/card'
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../../../components/ui/select'
import { Label } from '../../../../components/ui/label'
import { industries } from '@/data/industry'
const onBoardingForm = () => {

    const [selectedIndustries, setselectedIndustries] = useState(null);
    const router = useRouter();
    const { register, handleSubmit, formState: { errors },
        setValue, watch } = useForm({
            resolver: zodResolver(onBoardingSchema),
        })

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-xl rounded-2xl shadow-xl bg-white/80 backdrop-blur-md border border-gray-200 transition duration-300 hover:shadow-purple-300">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-gray-800">Complete Your Profile</CardTitle>
                    <CardDescription className="text-gray-600">Fill out your industry details below.</CardDescription>
                </CardHeader>
                <CardContent className="text-gray-700 space-y-2">
                    <form>
                        <div>
                            <Label htmlFor="industry">Industry</Label>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                            <SelectContent>
                                {industries.map((industry) => (
                                    <SelectItem key={industry.id} value={industry.name}>
                                        {industry.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        </div>

                    </form>
                </CardContent>

            </Card>
        </div>

    )
}

export default onBoardingForm
