// src/utils/helperFn.js
import { useRouter } from 'next/navigation';

export const useRoutingHelpers = () => {
    const router = useRouter();

    const handleTagClick = (tag) => {
        router.push(`/category?tag=${tag}`);
    };

    return { handleTagClick };
};
