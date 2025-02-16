'use client';
import { HiOutlineTrash } from 'react-icons/hi';
import Button from '@/app/_components/Button';
import toast from 'react-hot-toast';
import { deleteAllChats } from '@/app/_lib/chat-store';
import { useTransition } from 'react';
import TinySpinner from '@/app/_components/TinySpinner';

// Delete all chats permanently
export default function DeleteAllChatsButton() {
	const [isPending, startTransition] = useTransition();

	async function handleDeleteAll() {
		if (!window.confirm('Are you sure?')) return;
		startTransition(async () => {
			try {
				await deleteAllChats();
				toast.success('Chats deleted');
			} catch (err) {
				console.error(err);
				toast.error('Error deleting chats');
			}
		});
	}
	if (isPending)
		return (
			<div className="lg:mr-20">
				<TinySpinner />
			</div>
		);
	return (
		<Button onClick={handleDeleteAll} className="lg:mr-20">
			{' '}
			<HiOutlineTrash />
			Clear
		</Button>
	);
}
