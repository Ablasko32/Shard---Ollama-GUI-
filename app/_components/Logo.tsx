'use client';

import Image from 'next/image';
import DarkLogo from '@/public/logo.svg';
import LightLogo from '@/public/logo-light.svg';
import { useTheme } from 'next-themes';

export default function Logo({ type = 'large' }: { type?: string }) {
	const { theme } = useTheme();

	return (
		<div className="flex flex-col items-center">
			<div className="relative aspect-square h-12 lg:h-14">
				<Image
					quality={70}
					fill
					src={theme === 'light' ? LightLogo : DarkLogo}
					alt="App logo"
				/>
			</div>
			{type !== 'small' && (
				<p className="flex gap-1 text-xs">
					<span>Project</span>
					<span className="font-bold text-lightPrimary dark:text-darkPrimary">
						Shard
					</span>
				</p>
			)}
		</div>
	);
}
