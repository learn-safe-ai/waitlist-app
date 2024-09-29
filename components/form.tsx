import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { RainbowButton } from '@/components/ui/rainbow-button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { containerVariants, itemVariants } from '@/lib/animation-variants';
import { toast } from 'sonner';

interface FormProps {
  onSuccess: () => void;
}

interface FormData {
  name: string;
  email: string;
  industry: string;
  familiarityWithGenAI: string;
  intendedUseOfGenAI: string[];
  concernLevelAboutAIRisk: string;
}

const industryOptions = [
  'Finance and Banking',
  'Retail and E-commerce',
  'Marketing and Advertising',
  'Healthcare and Biotechnology',
  'Legal',
  'Other',
];

const familiarityOptions = [
  "I have heard about it but haven't used it",
  'I have experimented with it',
  'I have used GenAI at work',
  'I regularly use GenAI',
];

const intendedUseOptions = [
  'Leads/marketing',
  'Workflow automation',
  'Report generation',
  'Email copy',
  'Customer Success',
  'Other',
];

const concernLevelOptions = [
  'Unconcerned',
  'Concerned',
  'Priority'
];

export default function Form({ onSuccess }: FormProps) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    industry: '',
    familiarityWithGenAI: '',
    intendedUseOfGenAI: [],
    concernLevelAboutAIRisk: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (value: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      intendedUseOfGenAI: checked
        ? [...prev.intendedUseOfGenAI, value]
        : prev.intendedUseOfGenAI.filter((item) => item !== value),
    }));
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);

    const promise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("/api/join-waitlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          if (response.status === 429) {
            reject("Rate limited");
          } else {
            const errorData = await response.json();
            reject(errorData.error || "Failed to join waitlist");
          }
        } else {
          const data = await response.json();
          resolve(data);
        }
      } catch (error) {
        reject(error);
      }
    });

    toast.promise(promise, {
      loading: "Joining the waitlist...",
      success: "Thank you for joining the waitlist!",
      error: (error) => `${error}`,
    });

    promise.finally(() => {
      setLoading(false);
      onSuccess();
    });
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const renderQuestions = () => (
    <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">What industry do you work in?</CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          <RadioGroup
            onValueChange={(value) => handleRadioChange('industry', value)}
            value={formData.industry}
          >
            {industryOptions.map((option) => (
              <div className="flex items-center space-x-2" key={option}>
                <RadioGroupItem value={option} id={`industry-${option}`} className="border-input text-brand" />
                <Label htmlFor={`industry-${option}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
          {formData.industry === 'Other' && (
            <Input
              type="text"
              name="industryOther"
              placeholder="Please specify"
              onChange={handleInputChange}
              className="mt-2"
            />
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">What do you intend to use GenAI for?</CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          {intendedUseOptions.map((option) => (
            <div className="flex items-center space-x-2 mb-2" key={option}>
              <Checkbox
                id={`use-${option}`}
                checked={formData.intendedUseOfGenAI.includes(option)}
                onCheckedChange={(checked) => handleCheckboxChange(option, checked as boolean)}
                className="border-input data-[state=checked]:border-brand data-[state=checked]:bg-brand"
              />
              <Label htmlFor={`use-${option}`}>{option}</Label>
            </div>
          ))}
          {formData.intendedUseOfGenAI.includes('Other') && (
            <Input
              type="text"
              name="intendedUseOther"
              placeholder="Please specify"
              onChange={handleInputChange}
              className="mt-2"
            />
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">How concerned is your org about AI?</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            onValueChange={(value) => handleRadioChange('concernLevelAboutAIRisk', value)}
            value={formData.concernLevelAboutAIRisk}
            className="flex justify-between space-x-2"
          >
            {concernLevelOptions.map((option, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <RadioGroupItem
                  value={option}
                  id={`concern-${index}`}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={`concern-${index}`}
                  className="flex flex-col items-center justify-between rounded-md bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-2 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span className="text-center text-sm whitespace-pre-line">
                    {option}
                  </span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">How familiar are you with GenAI?</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            onValueChange={(value) => handleRadioChange('familiarityWithGenAI', value)}
            value={formData.familiarityWithGenAI}
          >
            {familiarityOptions.map((option) => (
              <div className="flex items-center space-x-2" key={option}>
                <RadioGroupItem value={option} id={`familiarity-${option}`} className="border-input text-brand"/>
                <Label htmlFor={`familiarity-${option}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <motion.div variants={itemVariants} className="w-full max-w-96 mx-auto">
            <Button onClick={handleNext} className="w-full px-8">Join waitlist to learn safe AI skills</Button>
          </motion.div>
        );
      case 1:
        return (
          <>
            <div className="mx-auto w-full max-w-96">
              <motion.div variants={itemVariants}>
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mb-2"
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mb-2"
                />
              </motion.div>
              {formData.email && !isValidEmail(formData.email) && (
                <motion.div variants={itemVariants}>
                  <p className="text-red-500 text-sm mt-1">Please enter a valid email address</p>
                </motion.div>
              )}
              <motion.div variants={itemVariants} className="flex justify-between items-center mt-4">
                <Button variant="ghost" onClick={handleBack} className="text-sm">
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!formData.name || !formData.email || !isValidEmail(formData.email)}
                  className="md:w-auto px-8"
                >
                  Next
                </Button>
              </motion.div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            {renderQuestions()}
            <motion.div variants={itemVariants} className="flex justify-between items-center mt-4 text-sm">
              By submitting your information, you agree to receive emails from LearnSafeAI.
            </motion.div>
            <motion.div variants={itemVariants} className="flex justify-between items-center mt-4">
              <Button variant="ghost" onClick={handleBack} className="text-sm">
                Back
              </Button>
              <RainbowButton
                onClick={handleSubmit}
                disabled={loading || !formData.industry || !formData.familiarityWithGenAI || formData.intendedUseOfGenAI.length === 0 || !formData.concernLevelAboutAIRisk}>
                {loading ? "Loading..." : "Start Your AI Journey!"}
              </RainbowButton>
            </motion.div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="mt-6 flex w-full max-w-[48rem] flex-col gap-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {renderStep()}
    </motion.div>
  );
}