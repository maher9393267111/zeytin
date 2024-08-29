import axios from 'axios';

export default async function useUploadImage(event) {
    const files = event.target?.files;
    const data = new FormData();
    for (const file of files) {
        data.append('file', file);
    }
    if (files) {
        const res = await axios.post('/api/upload', data).then((res) => {
            return res.data;
        });

        return res.link;
    } else {
        throw new Error('No Image Input Found');
    }
}

