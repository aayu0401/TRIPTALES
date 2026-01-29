import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
// Unused icon imports removed

const tripSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    destination: z.string().min(2, "Destination is required"),
    price: z.number().min(1, "Price must be greater than 0"),
    start_date: z.string().min(1, "Start date is required"),
    end_date: z.string().min(1, "End date is required"),
    max_participants: z.number().min(1, "Must have at least 1 participant"),
    image_url: z.string().url("Must be a valid URL"),
    description: z.string().min(10, "Description must be at least 10 characters"),
})

type TripFormValues = z.infer<typeof tripSchema>

interface TripFormProps {
    initialData?: Partial<TripFormValues>;
    onSubmit: (data: TripFormValues) => void;
    loading?: boolean;
}

export default function TripForm({ initialData, onSubmit, loading }: TripFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<TripFormValues>({
        resolver: zodResolver(tripSchema),
        defaultValues: {
            max_participants: 20,
            ...initialData
        }
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    label="Trip Title"
                    placeholder="E.g. Spiti Valley Adventure"
                    {...register("title")}
                    error={errors.title?.message}
                    className="pl-10"
                />
                <Input
                    label="Destination"
                    placeholder="E.g. Himachal Pradesh"
                    {...register("destination")}
                    error={errors.destination?.message}
                />

                <div className="relative">
                    <Input
                        label="Price (INR)"
                        type="number"
                        placeholder="15000"
                        {...register("price", { valueAsNumber: true })}
                        error={errors.price?.message}
                    />
                </div>

                <Input
                    label="Max Participants"
                    type="number"
                    {...register("max_participants", { valueAsNumber: true })}
                    error={errors.max_participants?.message}
                />

                <Input
                    label="Start Date"
                    type="date"
                    {...register("start_date")}
                    error={errors.start_date?.message}
                />

                <Input
                    label="End Date"
                    type="date"
                    {...register("end_date")}
                    error={errors.end_date?.message}
                />

                <div className="md:col-span-2">
                    <Input
                        label="Main Image URL"
                        placeholder="https://images.unsplash.com/..."
                        {...register("image_url")}
                        error={errors.image_url?.message}
                    />
                </div>

                <div className="md:col-span-2 space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Description</label>
                    <textarea
                        className="flex min-h-[120px] w-full rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-all"
                        placeholder="Tell them about the trip..."
                        {...register("description")}
                    />
                    {errors.description && <p className="text-xs text-red-500 ml-1">{errors.description.message}</p>}
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-slate-100">
                <Button variant="outline" type="button">Cancel</Button>
                <Button variant="gradient" type="submit" loading={loading} className="px-10">
                    {initialData ? "Update Trip" : "Publish Trip"}
                </Button>
            </div>
        </form>
    )
}
