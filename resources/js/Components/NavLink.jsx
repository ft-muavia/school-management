import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-2 pt-1 text-base font-semibold leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-black text-black font-bold focus:border-black'
                    : 'border-transparent text-gray-400 hover:border-black hover:text-black focus:border-black focus:text-black') +
                ' ' +
                className
            }
        >
            {children}
        </Link>
    );
}
