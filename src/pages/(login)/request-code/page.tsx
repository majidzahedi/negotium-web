import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { PhoneInput } from 'react-international-phone';
import { useNavigate } from 'react-router-dom';
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

interface loginResponse {
  accessToken: string;
  refreshToken: string;
}

const FormSchema = z.object({
  mobile: z.string().min(11, {
    message: 'Invalid mobile fromat',
  }),
});

export default function RequestCode() {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationKey: ['request-code'],
    mutationFn: (body: z.infer<typeof FormSchema>) =>
      api.post<loginResponse>('auth/code', body),
    onSuccess: (_, { mobile }) => {
      navigate(`/login/verify-code?mobile=${mobile}`);
    },
    onError: (e) => {
      form.setError('mobile', { message: e.message });
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      mobile: '',
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

    mutate({ mobile: data.mobile.replace('+98', '0') });
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
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="-mb-3">mobile</FormLabel>
                    <FormControl>
                      <PhoneInput
                        {...field}
                        inputClassName="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        defaultCountry="ir"
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
