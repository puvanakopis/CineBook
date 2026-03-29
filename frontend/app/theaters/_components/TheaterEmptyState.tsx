'use client';

interface TheaterEmptyStateProps {
    onClearFilters: () => void;
}

const TheaterEmptyState = ({ onClearFilters }: TheaterEmptyStateProps) => {
    return (
        <div className="text-center py-20">
            <p className="text-text-secondary text-lg">No theaters found matching your criteria.</p>
            <button
                onClick={onClearFilters}
                className="mt-4 bg-primary hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
                Clear Filters
            </button>
        </div>
    );
};

export default TheaterEmptyState;