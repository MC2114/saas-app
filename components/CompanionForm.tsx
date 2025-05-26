"use client"
import {z} from "zod"
import React from 'react'
import {useForm} from "react-hook-form";
// import {zodResolver} from "@hookform/resolvers/zod/src";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {Select, SelectContent, SelectTrigger, SelectValue, SelectItem} from "@/components/ui/select";
import {subjects} from "@/constants";
import {createCompanion} from "@/lib/actions/companion.actions";
import {redirect} from "next/navigation";


// Define form schema
const formSchema = z.object({
    name: z.string().min(1, {message: 'Companion is required'}),
    subject: z.string().min(1, {message: 'Subject is required'}),
    topic: z.string().min(1, {message: 'Topic name is required'}),
    voice: z.string().min(1, {message: 'Voice name is required'}),
    style: z.string().min(1, {message: 'Style name is required'}),
    duration: z.coerce.number().min(1, {message: 'Duration name is required'}),
})

const CompanionForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            subject: '',
            topic: '',
            voice: '',
            style: '',
            duration: 15,
        }
    })

    // Define submit handler
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const companion = await createCompanion(values);
        if (companion) {
            redirect(`/companions/${companion.id}`);
        } else {
            console.log("Failed to create companion");
            redirect(`/`);
        }
    }
    
    return (
        <div><Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Companion Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your companion name" {...field}
                                    className="input"
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                               <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                               >
                                   <SelectTrigger className={'input capitalize'}>
                                       <SelectValue placeholder="Select the subject"/>
                                   </SelectTrigger>

                                   <SelectContent>
                                       {subjects.map((subject) => (
                                           <SelectItem key={subject} value={subject} className={'capitalize'}>
                                               {subject}
                                           </SelectItem>
                                       ))}
                                   </SelectContent>
                               </Select>
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>What should the companion help with?</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Ex. Neural Networks" {...field}
                                    className="input"
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="voice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Voice Preference</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className={'input'}>
                                        <SelectValue placeholder="Select your preferred voice"/>
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="style"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Style</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className={'input'}>
                                        <SelectValue placeholder="Select your style"/>
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="formal">Formal</SelectItem>
                                        <SelectItem value="casual">Casual</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Estimated Duration (minutes)</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="15" {...field}
                                    className="input"
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />


                <Button type="submit" className={"w-full cursor-pointer"}>Build your Companion</Button>
            </form>
        </Form>
        </div>

    )
}
export default CompanionForm
