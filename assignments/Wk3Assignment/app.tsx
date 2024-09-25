import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

// Define the structure of a question
interface Question {
  id: number
  text: string
  options: string[]
  correctAnswer: string
}

// Sample questions (in a real app, these would come from an API or database)
const questions: Question[] = [
  {
    id: 1,
    text: "Como se dice 'hello' en español?",
    options: ["Hola", "Adiós", "Gracias", "Por favor"],
    correctAnswer: "Hola"
  },
  {
    id: 2,
    text: "Cual es el color del cielo?",
    options: ["Rojo", "Verde", "Azul", "Amarillo"],
    correctAnswer: "Azul"
  },
  {
    id: 3,
    text: "Como se dice 'cat' en español?",
    options: ["Perro", "Gato", "Pájaro", "Pez"],
    correctAnswer: "Gato"
  }
]

export default function DuolingoApp() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]

  const handleAnswer = (selectedAnswer: string) => {
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1)
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setShowResult(true)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestionIndex(0)
    setScore(0)
    setShowResult(false)
  }

  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-green-600">Duolingo Clone</h1>
        {!showResult ? (
          <>
            <Progress value={(currentQuestionIndex / questions.length) * 100} className="mb-4" />
            <h2 className="text-xl mb-4">{currentQuestion.text}</h2>
            <div className="grid grid-cols-2 gap-4">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  variant="outline"
                  className="p-2 text-lg"
                >
                  {option}
                </Button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
            <p className="text-xl mb-4">Your score: {score} / {questions.length}</p>
            <Button onClick={restartQuiz} className="p-2 text-lg">
              Restart Quiz
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}