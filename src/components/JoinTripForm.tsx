import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Linkedin, Instagram, Send } from "lucide-react"

const joinRequestSchema = z.object({
    full_name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    linkedin_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    instagram_handle: z.string().min(1, "Instagram handle is required"),
    message: z.string().optional(),
})

type JoinRequestValues = z.infer<typeof joinRequestSchema>

interface JoinTripFormProps {
    tripTitle: string;
    onSubmit: (data: JoinRequestValues) => void;
    onCancel: () => void;
    loading?: boolean;
}

export default function JoinTripForm({ tripTitle, onSubmit, onCancel, loading }: JoinTripFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<JoinRequestValues>({
        resolver: zodResolver(joinRequestSchema)
    })

    return (
        <div className="p-6">
            <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900">Join Request</h3>
                <p className="text-slate-500">Apply to join <span className="font-semibold text-emerald-600">{tripTitle}</span>. We review every profile to ensure a great group vibe.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Input
                    label="Full Name"
                    placeholder="John Doe"
                    {...register("full_name")}
                    error={errors.full_name?.message}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="john@example.com"
                        {...register("email")}
                        error={errors.email?.message}
                    />
                    <Input
                        label="Phone Number"
                        type="tel"
                        placeholder="+91 98765 43210"
                        {...register("phone")}
                        error={errors.phone?.message}
                    />
                </div>

                <div className="space-y-4">
                    <p className="text-sm font-semibold text-slate-700">Social Profiles (for vetting)</p>

                    <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600">
                            <Linkedin size={20} />
                        </div>
                        <Input
                            placeholder="LinkedIn Profile URL"
                            className="pl-10"
                            {...register("linkedin_url")}
                            error={errors.linkedin_url?.message}
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-600">
                            <Instagram size={20} />
                        </div>
                        <Input
                            placeholder="Instagram Handle (e.g. @wanderlust_john)"
                            className="pl-10"
                            {...register("instagram_handle")}
                            error={errors.instagram_handle?.message}
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">Message (Optional)</label>
                    <textarea
                        className="flex min-h-[100px] w-full rounded-xl border-2 border-slate-200 bg-white/50 px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-all"
                        placeholder="Tell us why you want to join this trip..."
                        {...register("message")}
                    />
                </div>

                <div className="flex gap-4 pt-4">
                    <Button variant="ghost" type="button" onClick={onCancel} className="flex-1">
                        Cancel
                    </Button>
                    <Button variant="gradient" type="submit" loading={loading} className="flex-1 gap-2">
                        <Send size={18} />
                        Send Request
                    </Button>
                </div>
            </form>
        </div>
    )
}
