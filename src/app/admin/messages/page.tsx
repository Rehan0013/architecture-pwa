import { getMessages, deleteMessage } from '@/actions/message';

interface IMessage {
    _id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: string;
}

export default async function AdminMessages() {
    const messages = await getMessages();

    return (
        <div>
            <h1 className="text-2xl font-serif mb-8">Inquiries</h1>

            <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                {messages.length === 0 ? (
                    <div className="p-8 text-center text-neutral-500">
                        No messages found.
                    </div>
                ) : (
                    <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
                        {messages.map((msg: IMessage) => (
                            <div key={msg._id} className="p-6 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                    <div>
                                        <h3 className="font-medium text-lg">{msg.subject}</h3>
                                        <div className="text-sm text-neutral-500 mt-1">
                                            <span className="font-medium text-black dark:text-white">{msg.name}</span> &lt;{msg.email}&gt;
                                            <span className="mx-2">•</span>
                                            {new Date(msg.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <form action={deleteMessage.bind(null, String(msg._id))}>
                                        <button
                                            type="submit"
                                            className="text-xs uppercase tracking-widest text-red-500 hover:text-red-700 border border-red-200 hover:border-red-500 px-3 py-1 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </form>
                                </div>
                                <p className="text-neutral-600 dark:text-neutral-300 whitespace-pre-wrap leading-relaxed">
                                    {msg.message}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
