'use client'

import { BandageIcon, BrainIcon, LineChart, TrendingUp, TrendingDown } from 'lucide-react';
import React from 'react'
import { format, formatDistanceToNow } from "date-fns"
import { Badge } from '../../../../components/ui/badge';
import { Progress } from '../../../../components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = ({ industryInsights }) => {
    const salaryData = industryInsights.salaryRanges.map((range) => ({
        name: range.role,
        min: range.min / 1000,
        max: range.max / 1000,
        median: range.median / 1000
    }));

    const demandLevelColor = (level) => {
        switch (level.toLowerCase()) {
            case "high":
                return "bg-blue-600";
            case "medium":
                return "bg-yellow-600"
            case "low":
                return "bg-red-600"
            default: return "bg-gray-600"
        }
    }

    const MarketOutLook = (outlook) => {
        switch (outlook.toLowerCase()) {
            case "positive":
                return { icon: TrendingUp, color: "text-blue-600" }
            case "neutral":
                return { icon: LineChart, color: "text-yellow-600" }
            case "negative":
                return { icon: TrendingDown, color: "text-red-600" }
            default: return { icon: LineChart, color: "text-gray-600" }
        }
    }

    const outLookIcon = MarketOutLook(industryInsights.marketOutlook).icon;
    const outLookColor = MarketOutLook(industryInsights.marketOutlook).color;

    const lastUpdatedDate = format(new Date(industryInsights.lastUpdated), "dd/MM/yyyy")
    const nextUpdateDistance = formatDistanceToNow(
        new Date(industryInsights.nextUpdate),
        { addSuffix: true }
    )

    return (
        <div className="space-y-6 p-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Industry Insights</h1>
                <Badge variant="outline" className="text-sm">
                    Last Updated: {lastUpdatedDate}
                </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-white/5 backdrop-blur-sm border-gray-800">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg">Market Outlook</CardTitle>
                        <outLookIcon className={`h-5 w-5 ${outLookColor}`} />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <p className="text-2xl font-semibold">{industryInsights.marketOutlook}</p>
                            <p className="text-sm text-gray-500">Next Update {nextUpdateDistance}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white/5 backdrop-blur-sm border-gray-800">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg">Industry Growth</CardTitle>
                        <outLookIcon className={`h-5 w-5 ${outLookColor}`} />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <p className="text-2xl font-semibold">{industryInsights.growthRate.toFixed(1)}%</p>
                            <Progress value={industryInsights.growthRate} className="h-2" />
                            <p className="text-sm text-gray-500">Next Update {nextUpdateDistance}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white/5 backdrop-blur-sm border-gray-800">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg">Demand Level</CardTitle>
                        <outLookIcon className={`h-5 w-5 ${outLookColor}`} />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <p className="text-2xl font-semibold">{industryInsights.demandLevel}</p>
                            <div className={`h-2 w-full rounded-full ${demandLevelColor(industryInsights.demandLevel)}`} />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-white/5 backdrop-blur-sm border-gray-800">
                <CardHeader>
                    <CardTitle className="text-lg">Top Skills</CardTitle>
                    <BrainIcon className="h-5 w-5" />
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {industryInsights.topSkills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-sm">
                                {skill}
                            </Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-gray-800">
                <CardHeader>
                    <CardTitle className="text-lg">Salary Ranges by Roles</CardTitle>
                    <CardDescription>
                        Displaying minimum and maximum salaries in thousands
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={salaryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="min" fill="#8884d8" name="Minimum" />
                                <Bar dataKey="max" fill="#82ca9d" name="Maximum" />
                                <Bar dataKey="median" fill="#ffc658" name="Median" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Dashboard