import { lineSpinner } from 'ldrs'

const LoadingPage = () => {
    lineSpinner.register()

    return (
        <div className='h-screen w-full flex items-center justify-center'>
                <l-line-spinner
                size="40"
                stroke="3"
                speed="1" 
                color="green" 
                ></l-line-spinner>
        </div>
    );
};

export default LoadingPage;