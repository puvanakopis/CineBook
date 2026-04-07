'use client';

import { useState, useEffect } from 'react';
import { useMovie } from '@/contexts/MovieContext';
import { Movie, CreateMovieRequest } from '@/interfaces/movieInterface';
import { MdClose } from 'react-icons/md';

interface MovieModalProps {
  isOpen: boolean;
  onClose: () => void;
  movie?: Movie;
}

const genresList = [
  'Action', 'Adventure', 'Comedy', 'Drama', 'Horror',
  'Romance', 'Sci-Fi', 'Thriller', 'Animation', 'Documentary',
  'Fantasy', 'Mystery', 'Crime', 'Family', 'History'
];

const languagesList = [
  'English', 'Spanish', 'French', 'German', 'Italian',
  'Japanese', 'Korean', 'Mandarin', 'Hindi', 'Tamil',
  'Telugu', 'Portuguese', 'Russian', 'Arabic'
];

const formatsList = ['2D', '3D', 'IMAX', '4DX', 'Dolby'];

export function MovieModal({ isOpen, onClose, movie }: MovieModalProps) {
  const { createMovie, updateMovie } = useMovie();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CreateMovieRequest>({
    title: '',
    genres: [],
    duration: '',
    releaseDate: '',
    languages: [],
    formats: '2D',
    synopsis: '',
    poster: '',
    trailerUrl: '',
    cast: [],
    reviews: [],
    isNowShowing: false,
    isUpcoming: false,
  });
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [posterPreview, setPosterPreview] = useState<string>('');
  const [castMembers, setCastMembers] = useState<Array<{ name: string; role: string; profilePicture: string }>>([]);

  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title,
        genres: movie.genres,
        duration: movie.duration,
        releaseDate: movie.releaseDate,
        languages: movie.languages,
        formats: movie.formats,
        synopsis: movie.synopsis,
        poster: movie.poster,
        trailerUrl: movie.trailerUrl,
        cast: movie.cast || [],
        reviews: movie.reviews || [],
        isNowShowing: movie.isNowShowing,
        isUpcoming: movie.isUpcoming,
      });
      setCastMembers(movie.cast || []);
      setPosterPreview(movie.poster);
    } else {
      resetForm();
    }
  }, [movie]);

  useEffect(() => {
    // Disable body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const resetForm = () => {
    setFormData({
      title: '',
      genres: [],
      duration: '',
      releaseDate: '',
      languages: [],
      formats: '2D',
      synopsis: '',
      poster: '',
      trailerUrl: '',
      cast: [],
      reviews: [],
      isNowShowing: false,
      isUpcoming: false,
    });
    setCastMembers([]);
    setPosterFile(null);
    setPosterPreview('');
  };

  const handleGenreToggle = (genre: string) => {
    setFormData(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre]
    }));
  };

  const handleLanguageToggle = (language: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

  const handleAddCast = () => {
    setCastMembers([...castMembers, { name: '', role: '', profilePicture: '' }]);
  };

  const handleCastChange = (index: number, field: string, value: string) => {
    const updated = [...castMembers];
    updated[index] = { ...updated[index], [field]: value };
    setCastMembers(updated);
  };

  const handleRemoveCast = (index: number) => {
    setCastMembers(castMembers.filter((_, i) => i !== index));
  };

  const handlePosterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPosterFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPosterPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitData: any = {
        title: formData.title,
        genres: formData.genres,
        duration: formData.duration,
        releaseDate: formData.releaseDate,
        languages: formData.languages,
        formats: formData.formats,
        synopsis: formData.synopsis,
        trailerUrl: formData.trailerUrl,
        cast: castMembers,
        isNowShowing: formData.isNowShowing,
        isUpcoming: formData.isUpcoming,
      };

      if (posterFile) {
        submitData.poster = posterFile;
      }

      if (movie) {
        await updateMovie(movie._id, submitData);
      } else {
        await createMovie(submitData);
      }

      onClose();
      resetForm();
    } catch (error) {
      console.error('Error saving movie:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred Background Overlay */}
      <div
        className="fixed inset-0 backdrop-blur-md bg-black/30 transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white dark:bg-surface-dark rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-none">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-surface-dark border-b border-gray-200 dark:border-[#392828] px-6 py-4 flex justify-between items-center z-10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {movie ? 'Edit Movie' : 'Add New Movie'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1f1212] transition-colors"
          >
            <MdClose className="text-2xl text-slate-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-[#b99d9d] mb-2">
                Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full rounded-lg border border-gray-300 dark:border-[#392828] bg-slate-50 dark:bg-[#120a0a] px-4 py-2 text-slate-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-[#b99d9d] mb-2">
                Duration (e.g., "2h 30m") *
              </label>
              <input
                type="text"
                required
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full rounded-lg border border-gray-300 dark:border-[#392828] bg-slate-50 dark:bg-[#120a0a] px-4 py-2 text-slate-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-[#b99d9d] mb-2">
                Release Date *
              </label>
              <input
                type="date"
                required
                value={formData.releaseDate}
                onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
                className="w-full rounded-lg border border-gray-300 dark:border-[#392828] bg-slate-50 dark:bg-[#120a0a] px-4 py-2 text-slate-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-[#b99d9d] mb-2">
                Format *
              </label>
              <select
                required
                value={formData.formats}
                onChange={(e) => setFormData({ ...formData, formats: e.target.value })}
                className="w-full rounded-lg border border-gray-300 dark:border-[#392828] bg-slate-50 dark:bg-[#120a0a] px-4 py-2 text-slate-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {formatsList.map(format => (
                  <option key={format} value={format}>{format}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Genres */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-[#b99d9d] mb-2">
              Genres *
            </label>
            <div className="flex flex-wrap gap-2">
              {genresList.map(genre => (
                <button
                  key={genre}
                  type="button"
                  onClick={() => handleGenreToggle(genre)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${formData.genres.includes(genre)
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 dark:bg-[#1f1212] text-slate-700 dark:text-[#b99d9d] hover:bg-gray-300 dark:hover:bg-[#2a1a1a]'
                    }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-[#b99d9d] mb-2">
              Languages *
            </label>
            <div className="flex flex-wrap gap-2">
              {languagesList.map(language => (
                <button
                  key={language}
                  type="button"
                  onClick={() => handleLanguageToggle(language)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${formData.languages.includes(language)
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 dark:bg-[#1f1212] text-slate-700 dark:text-[#b99d9d] hover:bg-gray-300 dark:hover:bg-[#2a1a1a]'
                    }`}
                >
                  {language}
                </button>
              ))}
            </div>
          </div>

          {/* Poster */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-[#b99d9d] mb-2">
              Poster *
            </label>
            <div className="flex items-center gap-4">
              {posterPreview && (
                <div className="relative h-24 w-16 overflow-hidden rounded-lg border border-gray-200 dark:border-[#392828]">
                  <img src={posterPreview} alt="Poster preview" className="h-full w-full object-cover" />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handlePosterChange}
                className="flex-1 rounded-lg border border-gray-300 dark:border-[#392828] bg-slate-50 dark:bg-[#120a0a] px-4 py-2 text-slate-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Trailer */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-[#b99d9d] mb-2">
              Trailer URL *
            </label>
            <input
              type="url"
              required
              value={formData.trailerUrl}
              onChange={(e) => setFormData({ ...formData, trailerUrl: e.target.value })}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full rounded-lg border border-gray-300 dark:border-[#392828] bg-slate-50 dark:bg-[#120a0a] px-4 py-2 text-slate-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Synopsis */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-[#b99d9d] mb-2">
              Synopsis *
            </label>
            <textarea
              required
              rows={4}
              value={formData.synopsis}
              onChange={(e) => setFormData({ ...formData, synopsis: e.target.value })}
              className="w-full rounded-lg border border-gray-300 dark:border-[#392828] bg-slate-50 dark:bg-[#120a0a] px-4 py-2 text-slate-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Cast */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-[#b99d9d]">
                Cast
              </label>
              <button
                type="button"
                onClick={handleAddCast}
                className="text-sm text-primary hover:text-primary-dark"
              >
                + Add Cast Member
              </button>
            </div>
            <div className="space-y-3">
              {castMembers.map((cast, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-gray-50 dark:bg-[#1a0f0f] rounded-lg">
                  <input
                    type="text"
                    placeholder="Name"
                    value={cast.name}
                    onChange={(e) => handleCastChange(index, 'name', e.target.value)}
                    className="rounded-lg border border-gray-300 dark:border-[#392828] bg-white dark:bg-[#120a0a] px-3 py-1.5 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Role"
                    value={cast.role}
                    onChange={(e) => handleCastChange(index, 'role', e.target.value)}
                    className="rounded-lg border border-gray-300 dark:border-[#392828] bg-white dark:bg-[#120a0a] px-3 py-1.5 text-sm"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Profile Picture URL"
                      value={cast.profilePicture}
                      onChange={(e) => handleCastChange(index, 'profilePicture', e.target.value)}
                      className="flex-1 rounded-lg border border-gray-300 dark:border-[#392828] bg-white dark:bg-[#120a0a] px-3 py-1.5 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveCast(index)}
                      className="text-red-500 hover:text-red-700 px-2"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isNowShowing}
                onChange={(e) => setFormData({ ...formData, isNowShowing: e.target.checked, isUpcoming: false })}
                className="w-4 h-4 text-primary rounded focus:ring-primary"
              />
              <span className="text-sm text-slate-700 dark:text-[#b99d9d]">Now Showing</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isUpcoming}
                onChange={(e) => setFormData({ ...formData, isUpcoming: e.target.checked, isNowShowing: false })}
                className="w-4 h-4 text-primary rounded focus:ring-primary"
              />
              <span className="text-sm text-slate-700 dark:text-[#b99d9d]">Upcoming</span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-[#392828]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-[#392828] text-slate-700 dark:text-[#b99d9d] hover:bg-gray-50 dark:hover:bg-[#1f1212] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Saving...' : movie ? 'Update Movie' : 'Create Movie'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}