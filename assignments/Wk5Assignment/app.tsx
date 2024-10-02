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

const App: React.FC = () => {
  const [progress, setProgress] = useState<number>(0)

  const handleClick = () => {
    setProgress((prevProgress) => Math.min(prevProgress + 10, 100))
  }

  return (
    <div>
      <Button onClick={handleClick}>Increase Progress</Button>
      <Progress value={progress} />
    </div>
  )
}


const NextLesson: React.FC = () => {
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const lessonSteps = [
    { type: 'translation', text: 'Translate: "Hello, how are you?"', answer: 'Hola, ¿cómo estás?' },
    { type: 'matching', pairs: [['Hello', 'Hola'], ['Goodbye', 'Adiós'], ['Please', 'Por favor']] },
    { type: 'listening', audio: 'buenos_dias.mp3', text: 'Buenos días' },
  ];

  const handleNextStep = () => {
    if (currentStep < lessonSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setLessonCompleted(true);
    }
  };

  const renderStep = () => {
    const step = lessonSteps[currentStep];
    switch (step.type) {
      case 'translation':
        return (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">{step.text}</h3>
            <input type="text" className="w-full p-2 border rounded" placeholder="Type your answer" />
          </div>
        );
      case 'matching':
        return (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Match the pairs:</h3>
            <div className="grid grid-cols-2 gap-2">
              {step.pairs.map(([word, translation], index) => (
                <Button key={index} variant="outline" className="p-2">
                  {word} - {translation}
                </Button>
              ))}
            </div>
          </div>
        );
      case 'listening':
        return (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Listen and type what you hear:</h3>
            <Button className="mb-2">
              <IconVolume className="mr-2" />
              Play Audio
            </Button>
            <input type="text" className="w-full p-2 border rounded" placeholder="Type what you hear" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Next Lesson</h2>
      {!lessonCompleted ? (
        <>
          <Progress value={(currentStep / lessonSteps.length) * 100} className="mb-4" />
          {renderStep()}
          <Button onClick={handleNextStep} className="w-full p-2 text-lg">
            {currentStep < lessonSteps.length - 1 ? 'Next' : 'Finish Lesson'}
          </Button>
        </>
      ) : (
        <div className="text-center">
          <h3 className="text-xl font-bold mb-4">Lesson Completed!</h3>
          <Button className="p-2 text-lg">Continue to Next Lesson</Button>
        </div>
      )}
    </div>
  );
};

export default NextLesson;





