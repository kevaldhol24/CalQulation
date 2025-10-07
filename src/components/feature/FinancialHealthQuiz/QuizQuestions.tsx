"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { QuizQuestion, QuizAnswers } from "./types";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState } from "react";

interface QuizQuestionsProps {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  answers: QuizAnswers;
  onAnswer: (questionId: string, value: number) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function QuizQuestions({
  questions,
  currentQuestionIndex,
  answers,
  onAnswer,
  onNext,
  onPrevious,
}: QuizQuestionsProps) {
  const currentQuestion = questions[currentQuestionIndex];
  const [sliderValue, setSliderValue] = useState<number[]>([
    answers[currentQuestion.id] ?? currentQuestion.defaultValue ?? 0
  ]);
  
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    onAnswer(currentQuestion.id, value[0]);
  };

  const handleOptionSelect = (value: number) => {
    onAnswer(currentQuestion.id, value);
  };

  const isAnswered = answers[currentQuestion.id] !== undefined;
  const canGoNext = isAnswered;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-emerald-500 to-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
              {currentQuestionIndex + 1}
            </div>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
              {currentQuestion.category.charAt(0).toUpperCase() + currentQuestion.category.slice(1)}
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {currentQuestion.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {currentQuestion.subtitle}
          </p>
        </div>

        <div className="p-8">
          {currentQuestion.type === "multiple_choice" && (
            <div className="space-y-3">
              {currentQuestion.options?.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleOptionSelect(option.value)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                    answers[currentQuestion.id] === option.value
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md"
                      : "border-gray-200 dark:border-gray-600 hover:border-blue-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        answers[currentQuestion.id] === option.value
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      {answers[currentQuestion.id] === option.value && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {option.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {currentQuestion.type === "range" && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full text-white font-bold text-xl mb-4">
                  {currentQuestion.suffix}
                  {sliderValue[0].toLocaleString("en-IN")}
                </div>
              </div>
              
              <div className="px-4">
                <Slider
                  value={sliderValue}
                  onValueChange={handleSliderChange}
                  min={currentQuestion.min}
                  max={currentQuestion.max}
                  step={currentQuestion.step}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
                  <span>{currentQuestion.suffix}{currentQuestion.min?.toLocaleString("en-IN")}</span>
                  <span>{currentQuestion.suffix}{currentQuestion.max?.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={currentQuestionIndex === 0}
          className="flex items-center gap-2 px-6 py-3"
        >
          <FaArrowLeft className="text-sm" />
          Previous
        </Button>

        <div className="flex items-center gap-2">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index < currentQuestionIndex
                  ? "bg-emerald-500"
                  : index === currentQuestionIndex
                  ? "bg-blue-500"
                  : "bg-gray-200 dark:bg-gray-600"
              }`}
            />
          ))}
        </div>

        <Button
          onClick={onNext}
          disabled={!canGoNext}
          className={`flex items-center gap-2 px-6 py-3 ${
            canGoNext
              ? "bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700"
              : ""
          }`}
        >
          {currentQuestionIndex === questions.length - 1 ? "Get Results" : "Next"}
          <FaArrowRight className="text-sm" />
        </Button>
      </div>
    </div>
  );
}