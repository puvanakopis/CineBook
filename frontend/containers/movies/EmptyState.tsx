'use client';

interface EmptyStateProps {
    onClearFilters: () => void;
}

const EmptyState = ({ onClearFilters }: EmptyStateProps) => {
    return (
        <div className="text-center py-20">
            <p className="text-text-secondary text-lg">No movies found matching your criteria.</p>
            <button
                onClick={onClearFilters}
                className="mt-4 bg-primary hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
                Clear Filters
            </button>
        </div>
    );
};

export default EmptyState;