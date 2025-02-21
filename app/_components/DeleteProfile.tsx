'use client';

import Button from '@/app/_components/Button';
import toast from 'react-hot-toast';
import { authClient } from '@/app/_lib/auth-client';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import TinySpinner from '@/app/_components/TinySpinner';

export default function DeleteProfile() {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	async function handleLocalStorageCleaning() {
		if (!window.confirm('Are you sure?')) return;
		startTransition(async () => {
			try {
				await authClient.deleteUser({
					password: 'password',
				});
				toast.success('Profile deleted');
				router.push('/profile');
				router.refresh();
			} catch (err) {
				console.error(err);
				toast.error('Error deleting profile');
			}
		});
	}

	if (isPending) return <TinySpinner />;

	return (
		<Button
			onClick={handleLocalStorageCleaning}
			type="secondary"
			className="text-xs"
		>
			Delete profile
		</Button>
	);
}
