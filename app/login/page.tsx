"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/admin"
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      })

      if (result?.error) {
        setError("Invalid email or password")
        setIsLoading(false)
        return
      }

      router.push(callbackUrl)
    } catch (error) {
      setError("An unexpected error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-200px)] circuit-bg">
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-primary/10 z-0"></div>
      <div className="digital-lines absolute inset-0 z-0"></div>

      <Card className="w-full max-w-md relative z-10 bg-card border-muted">
        <div className="absolute -left-1 -top-1 w-3 h-3 bg-primary"></div>
        <div className="absolute -right-1 -top-1 w-3 h-3 bg-primary"></div>
        <div className="absolute -left-1 -bottom-1 w-3 h-3 bg-primary"></div>
        <div className="absolute -right-1 -bottom-1 w-3 h-3 bg-primary"></div>

        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            <span className="code-text">&lt;</span>
            Admin Login
            <span className="code-text">/&gt;</span>
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@42events.edu"
                {...register("email")}
                className="bg-background border-muted"
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Button variant="link" className="p-0 h-auto text-primary" type="button">
                  Forgot password?
                </Button>
              </div>
              <Input id="password" type="password" {...register("password")} className="bg-background border-muted" />
              {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            </div>

            <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-white" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="relative my-4 w-full">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-primary/20"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full">
            <Button
              variant="outline"
              type="button"
              onClick={() => signIn("google", { callbackUrl })}
              className="border-primary/50 text-primary hover:bg-primary/10"
            >
              Google
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => signIn("microsoft", { callbackUrl })}
              className="border-primary/50 text-primary hover:bg-primary/10"
            >
              Microsoft
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
