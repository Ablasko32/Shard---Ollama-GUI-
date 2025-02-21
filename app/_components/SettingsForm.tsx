'use client';

import toast from 'react-hot-toast';
import { updateSettings } from '@/app/_lib/actions';
import Button from '@/app/_components/Button';
import { HiOutlineSparkles } from 'react-icons/hi';
import { useTransition } from 'react';
import TinySpinner from '@/app/_components/TinySpinner';

export default function SettingsForm({ settings }) {
	const [isPending, startTransition] = useTransition();

	async function handleSubmit(e) {
		e.preventDefault();

		const formData = new FormData(e.target);
		startTransition(async () => {
			try {
				await updateSettings(formData);
				toast.success('Settings saved');
			} catch (err) {
				console.error(err);
				toast.error('Error saving settings.');
			}
		});
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="mt-6 flex w-full max-w-2xl flex-col gap-4"
		>
			<div className="flex flex-col gap-1">
				<label className="text-sm font-semibold lg:text-lg" htmlFor="name">
					What will the model call you?
				</label>
				<input
					defaultValue={settings?.username}
					className="rounded-md bg-lightSecondary p-2 focus:outline-none focus:ring focus:ring-lightPrimary dark:bg-darkSecondary dark:focus:ring-darkPrimary"
					id="name"
					type="text"
					placeholder="Your name"
					name="username"
				/>
			</div>

			<div className="flex flex-col gap-1">
				<label className="text-sm font-semibold lg:text-lg" htmlFor="system">
					Default system message?
				</label>
				<textarea
					defaultValue={settings?.system}
					className="resize-none rounded-md bg-lightSecondary p-2 focus:outline-none focus:ring focus:ring-lightPrimary dark:bg-darkSecondary dark:focus:ring-darkPrimary"
					id="system"
					rows={5}
					placeholder="You are a helpful assistant."
					name="system"
				/>
			</div>

			{isPending ? (
				<div className="mt-2 flex justify-center">
					<TinySpinner />
				</div>
			) : (
				<Button className="mt-1">
					<HiOutlineSparkles />
					save
				</Button>
			)}
		</form>
	);
}
