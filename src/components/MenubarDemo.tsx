import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { useTheme } from '@/hooks/use-theme.hook';
import { User } from '@/lib/query-options';
import { Avatar } from '@nextui-org/react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Separator } from './ui/separator';
import { useModal } from '@/hooks/use-modal.hook';
import { Theme } from '@/components/providers/theme-provider.provider';

export function MenubarDemo({ user }: { user: User }) {
  const themes: Theme[] = ['light', 'dark', 'system'];
  const { setTheme, theme: currentTheme } = useTheme();
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();

  useEffect(() => {
    const updateHtmlAttributes = () => {
      document.documentElement.lang = language;
      document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
    };

    updateHtmlAttributes();
  }, [language]);

  const { onOpen } = useModal();

  return (
    <div dir="ltr">
      <Menubar className="w-full border-none">
        <Avatar src={user.imageUrl} name={user.name} size="sm" />
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              New Tab <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              New Window <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>New Incognito Window</MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Share</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Email link</MenubarItem>
                <MenubarItem>Messages</MenubarItem>
                <MenubarItem>Notes</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem onSelect={() => onOpen('upload')}>
              Uploads <MenubarShortcut>⌘P</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Undo <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Find</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Search the web</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Find...</MenubarItem>
                <MenubarItem>Find Next</MenubarItem>
                <MenubarItem>Find Previous</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>Cut</MenubarItem>
            <MenubarItem>Copy</MenubarItem>
            <MenubarItem>Paste</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Settings</MenubarTrigger>
          <MenubarContent>
            <MenubarSub>
              <MenubarSubTrigger>Language</MenubarSubTrigger>
              <MenubarSubContent>
                {['en', 'fa'].map((language) => (
                  <MenubarItem
                    key={language}
                    onClick={() => changeLanguage(language)}
                  >
                    {t(`languages.${language}`)}
                  </MenubarItem>
                ))}
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSub>
              <MenubarSubTrigger>Theme</MenubarSubTrigger>
              <MenubarSubContent>
                {themes.map((theme) => (
                  <MenubarCheckboxItem
                    checked={theme === currentTheme}
                    key={theme}
                    onClick={() => setTheme(theme)}
                  >
                    {theme}
                  </MenubarCheckboxItem>
                ))}
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>profile</MenubarTrigger>
          <MenubarContent>
            <MenubarRadioGroup value="benoit">
              <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
              <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
              <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
            </MenubarRadioGroup>
            <MenubarSeparator />
            <MenubarItem inset>Edit...</MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset>Add Profile...</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <Separator />
    </div>
  );
}
