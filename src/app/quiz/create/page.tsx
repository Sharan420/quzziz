"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const questionSchema = z.object({
  question: z.string().min(1, "Question is required"),
  options: z
    .array(z.string().min(1, "Option cannot be empty"))
    .min(2, "At least 2 options are required")
    .max(4, "Maximum 4 options allowed"),
  correctOption: z
    .number()
    .min(0, "Correct option must be between 0 and 3")
    .max(3, "Correct option must be between 0 and 3"),
});

const quizSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description is too long"),
  imageUrl: z.string().url("Invalid image URL").optional(),
  questions: z
    .array(questionSchema)
    .min(1, "At least one question is required")
    .max(20, "Maximum 20 questions allowed"),
});

const CreateQuizPage = () => {
  const form = useForm<z.infer<typeof quizSchema>>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      questions: [
        {
          question: "",
          options: ["", ""],
          correctOption: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  async function onSubmit(values: z.infer<typeof quizSchema>) {
    const { title, description, imageUrl, questions } = values;
    const response = await fetch("/api/createQuiz", {
      method: "POST",
      body: JSON.stringify({ title, description, imageUrl, questions }),
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      toast.success("Quiz created successfully");
    } else {
      toast.error("Failed to create quiz");
    }
  }

  const addQuestion = () => {
    append({
      question: "",
      options: ["", ""],
      correctOption: 0,
    });
  };

  const addOption = (questionIndex: number) => {
    const currentOptions = form.getValues(`questions.${questionIndex}.options`);
    if (currentOptions.length < 4) {
      form.setValue(`questions.${questionIndex}.options`, [
        ...currentOptions,
        "",
      ]);
    }
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const currentOptions = form.getValues(`questions.${questionIndex}.options`);
    if (currentOptions.length > 2) {
      const newOptions = currentOptions.filter(
        (_, index) => index !== optionIndex
      );
      form.setValue(`questions.${questionIndex}.options`, newOptions);

      // Update correctOption if it was the removed option
      const currentCorrectOption = form.getValues(
        `questions.${questionIndex}.correctOption`
      );
      if (currentCorrectOption === optionIndex) {
        form.setValue(`questions.${questionIndex}.correctOption`, 0);
      } else if (currentCorrectOption > optionIndex) {
        form.setValue(
          `questions.${questionIndex}.correctOption`,
          currentCorrectOption - 1
        );
      }
    }
  };

  return (
    <Card className='w-full max-w-2xl mx-auto mt-10'>
      <CardHeader>
        <CardTitle>Create Quiz</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quiz Title</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter quiz title' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter quiz description' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='imageUrl'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='https://example.com/image.jpg'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A URL for the quiz cover image
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <h3 className='text-lg font-medium'>Questions</h3>
                <Button
                  type='button'
                  size='sm'
                  onClick={addQuestion}
                  disabled={fields.length >= 20}
                >
                  <Plus className='h-4 w-4 mr-2' />
                  Add Question
                </Button>
              </div>

              {fields.map((field, index) => (
                <div key={field.id} className='border p-4 rounded-lg space-y-4'>
                  <div className='flex items-center justify-between'>
                    <h4 className='font-medium'>Question {index + 1}</h4>
                    {fields.length > 1 && (
                      <Button
                        type='button'
                        variant={null}
                        size='sm'
                        onClick={() => remove(index)}
                      >
                        <Trash2 className='h-4 w-4 text-destructive' />
                      </Button>
                    )}
                  </div>

                  <FormField
                    control={form.control}
                    name={`questions.${index}.question`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Question Text</FormLabel>
                        <FormControl>
                          <Input placeholder='Enter question' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <FormLabel>Options</FormLabel>
                      <Button
                        type='button'
                        variant='default'
                        size='sm'
                        onClick={() => addOption(index)}
                        disabled={
                          form.watch(`questions.${index}.options`).length >= 4
                        }
                      >
                        <Plus className='h-4 w-4 mr-2' />
                        Add Option
                      </Button>
                    </div>

                    {form
                      .watch(`questions.${index}.options`)
                      .map((_, optionIndex) => (
                        <div
                          key={optionIndex}
                          className='flex items-center gap-2'
                        >
                          <FormField
                            control={form.control}
                            name={`questions.${index}.options.${optionIndex}`}
                            render={({ field }) => (
                              <FormItem className='flex-1'>
                                <FormControl>
                                  <Input
                                    placeholder={`Option ${optionIndex + 1}`}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          {form.watch(`questions.${index}.options`).length >
                            2 && (
                            <Button
                              type='button'
                              variant='default'
                              size='sm'
                              onClick={() => removeOption(index, optionIndex)}
                            >
                              <Trash2 className='h-4 w-4' />
                            </Button>
                          )}
                        </div>
                      ))}
                  </div>

                  <FormField
                    control={form.control}
                    name={`questions.${index}.correctOption`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correct Option</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            min='0'
                            max={
                              form.watch(`questions.${index}.options`).length -
                              1
                            }
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          Enter the index of the correct option (0-
                          {form.watch(`questions.${index}.options`).length - 1})
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>

            <Button type='submit'>Create Quiz</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateQuizPage;
