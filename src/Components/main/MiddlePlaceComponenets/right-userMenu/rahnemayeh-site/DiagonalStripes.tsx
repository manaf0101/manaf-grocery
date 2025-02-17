

function DiagonalStripes() {
    return (
        <div className="w-4 h-full relative">
            <div className="absolute inset-0 bg-stripes-light dark:bg-stripes-dark bg-fixed"></div>
        </div>
    );
}

export default DiagonalStripes;