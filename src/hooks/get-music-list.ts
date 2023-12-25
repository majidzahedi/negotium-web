// src/services/musicService.ts
import { invoke } from '@tauri-apps/api/tauri';

export async function getMusicList(directory: string): Promise<string[]> {
  try {
    const musicList = await invoke('get_music_list', { directory });
    return musicList as string[];
  } catch (error) {
    console.error('Error fetching music list:', error);
    return [];
  }
}
