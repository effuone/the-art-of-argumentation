'use client';

import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { CheckCheck, Copy, Share2 } from 'lucide-react';
import React from 'react';
import { FaTelegram } from 'react-icons/fa';

const ShareButton = ({
  fallacyName,
  slug,
}: {
  fallacyName: string;
  slug: string;
}) => {
  const [copied, setCopied] = React.useState(false);

  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/${slug}`;
    }
    return `https://logical-fallacies.vercel.app/${slug}`;
  };

  const shareUrl = getShareUrl();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      toast('Ссылка скопирована', {
        description: 'Ссылка скопирована в буфер обмена',
      });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareToTelegram = () => {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(
        shareUrl
      )}&text=${encodeURIComponent(
        `Узнайте больше о логической ошибке "${fallacyName}"`
      )}`,
      '_blank'
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          className='flex items-center'
        >
          <Share2 className='h-4 w-4 mr-2' />
          Поделиться
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='w-56'
      >
        <DropdownMenuItem
          onClick={copyToClipboard}
          className='cursor-pointer'
        >
          {copied ? (
            <CheckCheck className='h-4 w-4 mr-2' />
          ) : (
            <Copy className='h-4 w-4 mr-2' />
          )}
          Копировать ссылку
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={shareToTelegram}
          className='cursor-pointer'
        >
          <FaTelegram className='h-4 w-4 mr-2 text-blue-500' />
          Telegram
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShareButton;
