import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { CheckCircle2, XCircle } from 'lucide-react';

const QuizResult = ({ quizData, answers, score, resultData, onRestart }) => {
    return (
        <Card className="mx-2 my-10">
            <CardHeader>
                <CardTitle>Quiz Results</CardTitle>
                <CardDescription>Your score: {score}%</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {quizData.map((question, index) => {
                    const isCorrect = answers[index] === question.correctAnswer;
                    return (
                        <div key={index} className="p-4 border rounded-lg">
                            <div className="flex items-start gap-2">
                                {isCorrect ? (
                                    <CheckCircle2 className="text-green-500 mt-1" />
                                ) : (
                                    <XCircle className="text-red-500 mt-1" />
                                )}
                                <div className="flex-1">
                                    <p className="font-medium mb-2">
                                        Question {index + 1}: {question.question}
                                    </p>
                                    <div className="space-y-2 text-sm">
                                        <p className="text-muted-foreground">
                                            Your answer: {answers[index] || 'Not answered'}
                                        </p>
                                        {!isCorrect && (
                                            <p className="text-green-600">
                                                Correct answer: {question.correctAnswer}
                                            </p>
                                        )}
                                        <p className="text-muted-foreground mt-2">
                                            Explanation: {question.explanation}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {resultData?.improvementTip && (
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                        <p className="font-medium mb-2">Improvement Tip:</p>
                        <p className="text-sm text-muted-foreground">{resultData.improvementTip}</p>
                    </div>
                )}
            </CardContent>
            <CardFooter>
                <Button onClick={onRestart} className="w-full">
                    Start New Quiz
                </Button>
            </CardFooter>
        </Card>
    );
};

export default QuizResult; 