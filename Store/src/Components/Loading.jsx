import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
/*
    * Loading component
    * @param {string} message - Message to display while loading
    * @param {number} opacity - Opacity of the background
*/
export default function Loading({ message, opacity }) {
    const opt = {
        1: 'opacity-10',
        2: 'opacity-20',
        3: 'opacity-30',
        4: 'opacity-40',
        5: 'opacity-50',
        6: 'opacity-60',
        7: 'opacity-70',
        8: 'opacity-80',
        9: 'opacity-90',
        10: 'opacity-100'
    }
    return (
        <div className={`w-full h-screen flex justify-center items-center flex-col gap-4 fixed top-0 left-0 ${opt[opacity]}`}>
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
            <p className="text-gray-500 font-bold">{message || "Loading"}</p>
        </div>

    );
}