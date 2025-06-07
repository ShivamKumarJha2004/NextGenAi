"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import useFetch from '../../../../hooks/useFetch';
import React, { useEffect, useState } from 'react';
import { genrateQuiz, saveQuiz } from '../../../../actions/interview';
import { BarLoader } from 'react-spinners';
import { RadioGroup, RadioGroupItem } from '../../../../components/ui/radio-group';
import { Label } from '../../../../components/ui/label';
import { toast } from 'sonner';
import QuizResult from './QuizResult';

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answer, setAnswer] = useState([]);
    const [explain, setExplain] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [score, setScore] = useState(0);

    const {
        loading: isGeneratingQuiz,
        fetchData: startQuiz,
        data: quizData
    } = useFetch(genrateQuiz);

    const {
        loading: isSaving,
        fetchData: saveQuizData,
        data: resultData
    } = useFetch(saveQuiz);
  
    console.log(resultData);
    

    useEffect(() => {
        if (quizData) {
            setAnswer(new Array(quizData.length).fill(null));
        }
    }, [quizData]);

    const handleAnswer = (value) => {
        const newAnswers = [...answer];
        newAnswers[currentQuestion] = value;
        setAnswer(newAnswers);
    };

    const calculateScore = () => {
        let correct = 0;
        answer.forEach((ans, index) => {
            if (ans === quizData[index].correctAnswer) {
                correct++;
            }
        });
        const calculatedScore = Math.round((correct / quizData.length) * 100);
        setScore(calculatedScore);
        return calculatedScore;
    };

    const handleFinishQuiz = async () => {
        try {
            const finalScore = calculateScore();
            console.log("Saving quiz with data:", {
                questions: quizData,
                answers: answer,
                score: finalScore
            });
            
            const result = await saveQuizData({
                questions: quizData,
                answers: answer,
                score: finalScore
            });
            
            console.log("Save result:", result);
            setIsCompleted(true);
            toast.success("Quiz Completed!");
        } catch (error) {
            console.error("Error saving quiz:", error);
            toast.error(error.message || "Failed to save quiz data");
        }
    };

    if (isGeneratingQuiz || isSaving) {
        return <BarLoader className='mt-4' width={"100%"} color='gray' />;
    }

    if (!quizData) {
        return (
            <Card className="mx-2">
                <CardHeader>
                    <CardTitle>Ready to test your knowledge?</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        This quiz contains 10 questions specific to your industry and
                        skills. Take your time and choose the best answer for each question.
                    </p>
                </CardContent>
                <CardFooter>
                    <Button onClick={() => startQuiz()} className="w-full">
                        Start Quiz
                    </Button>
                </CardFooter>
            </Card>
        );
    }

    if (isCompleted) {
        return (
            <QuizResult 
                quizData={quizData}
                answers={answer}
                score={score}
                resultData={resultData}
                onRestart={() => window.location.reload()}
            />
        );
    }

    const question = quizData[currentQuestion];

    return (
        <Card className="mx-2">
            <CardHeader>
                <CardTitle>Question {currentQuestion + 1} of {quizData.length}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-lg font-medium">
                    {question.question}
                </p>
                <RadioGroup 
                    className="space-y-2 mt-4"
                    onValueChange={handleAnswer}
                    value={answer[currentQuestion]}
                >
                    {question.options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <RadioGroupItem value={option} id={`option-${index}`} />
                            <Label htmlFor={`option-${index}`}>{option}</Label>
                        </div>
                    ))}
                </RadioGroup>
                {explain && (
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                        <p className="font-medium mb-2">Explanation:</p>
                        <p className="text-sm text-muted-foreground">{question.explanation}</p>
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex gap-2">
                <Button 
                    onClick={() => setExplain(!explain)}
                    variant="outline"
                    className="flex-1"
                >
                    {explain ? 'Hide Explanation' : 'Show Explanation'}
                </Button>
                {currentQuestion === quizData.length - 1 ? (
                    <Button 
                        onClick={handleFinishQuiz}
                        className="flex-1"
                        disabled={!answer[currentQuestion]}
                    >
                        Finish Quiz
                    </Button>
                ) : (
                    <Button 
                        onClick={() => {
                            setCurrentQuestion(prev => prev + 1);
                            setExplain(false);
                        }}
                        className="flex-1"
                        disabled={!answer[currentQuestion]}
                    >
                        Next Question
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};

export default Quiz;