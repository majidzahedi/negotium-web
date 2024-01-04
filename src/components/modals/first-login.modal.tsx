import { useModal } from '@/hooks/use-modal.hook';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMediaQuery } from '@uidotdev/usehooks';
import * as z from 'zod';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
} from '@/components/ui/drawer';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@nextui-org/react';
import { AvatarDropzone } from '../drop-zones/avatar.drop-zone';
import { useApiAuth } from '@/hooks/use-api-auth';
import { useMutation } from '@tanstack/react-query';

const firstLoginReqSchema = z.object({
  name: z.string().min(3),
  imageUrl: z.string().url(),
});

export const FirstLoginModal = () => {
  const api = useApiAuth();
  const { isOpen, type, onClose } = useModal();
  const open = isOpen && type === 'FirstLoginModal';

  const isDesktop = useMediaQuery('(min-width: 768px)');

  const { mutate } = useMutation({
    mutationKey: ['editProfile'],
    mutationFn: (body: z.infer<typeof firstLoginReqSchema>) =>
      api.put('/user', body),
  });

  const form = useForm<z.infer<typeof firstLoginReqSchema>>({
    resolver: zodResolver(firstLoginReqSchema),
    defaultValues: {
      name: '',
      imageUrl: '',
    },
  });

  const onSubmit = (values: z.infer<typeof firstLoginReqSchema>) => {
    mutate(values, {
      onSuccess(data) {
        console.log(data);
      },
    });
  };

  if (!isDesktop)
    return (
      <Drawer open={open} onOpenChange={(value) => value !== open && onClose()}>
        <DrawerContent className="px-8">
          <DrawerHeader>Hello Agent!</DrawerHeader>
          <DrawerDescription>Let's get to know you better :)</DrawerDescription>

          <InnerComponent form={form} onSubmit={onSubmit} />
          <DrawerFooter onClick={form.handleSubmit(onSubmit)}>
            <Button variant="secondary">Next</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>Hello Agent!</DialogHeader>
        <DialogDescription>Let's get to know you better :)</DialogDescription>

        <InnerComponent form={form} onSubmit={onSubmit} />
        <DialogFooter onClick={form.handleSubmit(onSubmit)}>
          <Button variant="secondary">Next</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const InnerComponent = ({ form, onSubmit }: any) => (
  <Form {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn(
        'flex flex-col items-center justify-center space-x-4 rtl:space-x-reverse',
      )}
    >
      <FormField
        name="imageUrl"
        render={({ field }) => (
          <FormControl>
            <FormItem className="">
              <AvatarDropzone onChange={field.onChange} />
              <FormMessage />
            </FormItem>
          </FormControl>
        )}
      />

      <FormField
        name="name"
        render={({ field }) => (
          <FormControl>
            <FormItem className="w-full">
              <FormLabel className="uppercase">{field.name}</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          </FormControl>
        )}
      />
      <button hidden />
    </form>
  </Form>
);
