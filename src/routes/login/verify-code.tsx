import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import PinInput from 'react-pin-input';
import { toast } from 'sonner';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { api } from '@/lib/axios';
import { FileRoute, redirect, useRouter } from '@tanstack/react-router';

const verifyCodeSchema = z.object({
  mobile: z.string().catch(''),
  redirect: z.string().optional(),
});

export const Route = new FileRoute('/login/verify-code').createRoute({
  beforeLoad: ({ context, search }) => {
    if (!!context.auth.token?.accessToken && !!search.redirect) {
      // @ts-ignore
      throw redirect({
        to: search.redirect,
      });
    }
  },
  component: VerifyCode,
  validateSearch: verifyCodeSchema,
});

interface loginResponse {
  accessToken: string;
  refreshToken: string;
}

const FormSchema = z.object({
  code: z.string(),
  mobile: z.string().min(2, {
    message: 'Invalid mobile fromat',
  }),
});

function VerifyCode() {
  const { mobile } = Route.useSearch();
  const { auth } = Route.useRouteContext();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationKey: ['login'],
    mutationFn: (body: z.infer<typeof FormSchema>) =>
      api.post<loginResponse>('auth/login', body),
    onSuccess: (data) => {
      auth?.setToken(data.data);
    },
    onSettled: () => {
      router.invalidate();
    },
    onError: (e) => {
      form.setError('mobile', { message: e.message });
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      code: '',
      mobile,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.message('You submitted the following values:', {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    mutate(data);
  }

  return (
    <div className="flex min-h-[100dvh] w-full items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Login Form</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">code</FormLabel>
                    <FormControl>
                      <PinInput
                        length={6}
                        style={{
                          display: 'flex',
                          height: '40px',
                        }}
                        inputStyle={{
                          height: '40px',
                          width: '40px',
                          borderRadius: 'var(--radius)',
                          padding: '8px 12px',
                          fontSize: '14px',
                        }}
                        {...field}
                        onComplete={() => form.handleSubmit(onSubmit)()}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CardFooter className="space-x-8 p-0">
                <Button type="submit">Submit</Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
