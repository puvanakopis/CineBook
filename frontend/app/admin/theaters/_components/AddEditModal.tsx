'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { MdClose } from 'react-icons/md';
import { useTheater } from '@/contexts/theaterContext';
import { Theater, CreateTheaterRequest, UpdateTheaterRequest } from '@/interfaces/theaterInterface';
import { Movie } from '@/interfaces/movieInterface';
import getImage from '@/utils/imageUrl';

interface AddEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  theater?: Theater;
  movies: Movie[];
}

const amenityOptions = ['Parking', 'Wheelchair', 'Food & Beverage', 'Dolby', 'IMAX', 'Recliners', '4K'];

const buildMovieIds = (movies: Movie[] | undefined) => movies?.map((movie) => movie._id) ?? [];

export function AddEditModal({ isOpen, onClose, theater, movies }: AddEditModalProps) {
  const { createTheater, updateTheater } = useTheater();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [selectedMovies, setSelectedMovies] = useState<string[]>([]);
  const [formData, setFormData] = useState<CreateTheaterRequest>({
    name: '',
    address: '',
    city: '',
    amenities: [],
    image: '',
    description: '',
    phone: '',
    email: '',
    location: { lat: 0, lng: 0 },
    features: {},
    screens: [],
    reviews: [],
    movies: [],
  });

  const imageSrc = useMemo(() => {
    if (!imagePreview) return '';
    return getImage(imagePreview, 'theaters');
  }, [imagePreview]);

  const fieldClassName =
    'w-full rounded-lg border border-gray-300 dark:border-[#392828] bg-slate-50 dark:bg-[#120a0a] px-4 py-2 text-slate-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20';

  const textareaClassName =
    'w-full rounded-lg border border-gray-300 dark:border-[#392828] bg-slate-50 dark:bg-[#120a0a] px-4 py-2 text-slate-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20';

  useEffect(() => {
    if (theater) {
      setFormData({
        name: theater.name,
        address: theater.address,
        city: theater.city,
        amenities: theater.amenities || [],
        image: theater.image,
        description: theater.description,
        phone: theater.phone,
        email: theater.email,
        location: theater.location,
        features: theater.features || {},
        screens: theater.screens || [],
        reviews: theater.reviews || [],
        movies: theater.movies?.map((movie) => movie._id) || [],
      });
      setSelectedMovies(buildMovieIds(theater.movies));
      setImagePreview(theater.image);
    } else {
      resetForm();
    }
  }, [theater]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const resetForm = () => {
    setFormData({
      name: '',
      address: '',
      city: '',
      amenities: [],
      image: '',
      description: '',
      phone: '',
      email: '',
      location: { lat: 0, lng: 0 },
      features: {},
      screens: [],
      reviews: [],
      movies: [],
    });
    setSelectedMovies([]);
    setImagePreview('');
  };

  const toggleAmenity = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities?.includes(amenity)
        ? prev.amenities.filter((item) => item !== amenity)
        : [...(prev.amenities || []), amenity],
    }));
  };

  const toggleMovie = (movieId: string) => {
    setSelectedMovies((prev) =>
      prev.includes(movieId) ? prev.filter((id) => id !== movieId) : [...prev, movieId]
    );
  };

  const handleImageChange = (value: string) => {
    setFormData((prev) => ({ ...prev, image: value }));
    setImagePreview(value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const payload: CreateTheaterRequest | UpdateTheaterRequest = {
        ...formData,
        movies: selectedMovies,
      };

      if (theater) {
        await updateTheater(theater._id, payload);
      } else {
        await createTheater(payload);
      }

      onClose();
      resetForm();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 backdrop-blur-md bg-black/30 transition-opacity" onClick={onClose} />

      <div className="relative bg-white dark:bg-surface-dark rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-none">
        <div className="sticky top-0 bg-white dark:bg-surface-dark border-b border-gray-200 dark:border-[#392828] px-6 py-4 flex justify-between items-center z-10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {theater ? 'Edit Theater' : 'Add New Theater'}
          </h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1f1212] transition-colors">
            <MdClose className="text-2xl text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Name *">
              <input
                required
                value={formData.name}
                onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                className={fieldClassName}
              />
            </Field>

            <Field label="City *">
              <input
                required
                value={formData.city}
                onChange={(event) => setFormData({ ...formData, city: event.target.value })}
                className={fieldClassName}
              />
            </Field>

            <Field label="Address *" className="md:col-span-2">
              <input
                required
                value={formData.address}
                onChange={(event) => setFormData({ ...formData, address: event.target.value })}
                className={fieldClassName}
              />
            </Field>

            <Field label="Image URL *" className="md:col-span-2">
              <input
                required
                value={typeof formData.image === 'string' ? formData.image : ''}
                onChange={(event) => handleImageChange(event.target.value)}
                className={fieldClassName}
                placeholder="https://..."
              />
            </Field>

            {imageSrc && (
              <div className="md:col-span-2">
                <div className="relative h-52 overflow-hidden rounded-2xl border border-gray-200 dark:border-[#392828]">
                  <Image src={imageSrc} alt={formData.name || 'Theater preview'} fill className="object-cover" />
                </div>
              </div>
            )}

            <Field label="Description *" className="md:col-span-2">
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(event) => setFormData({ ...formData, description: event.target.value })}
                className={textareaClassName}
              />
            </Field>

            <Field label="Phone *">
              <input
                required
                value={formData.phone}
                onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                className={fieldClassName}
              />
            </Field>

            <Field label="Email *">
              <input
                required
                type="email"
                value={formData.email}
                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                className={fieldClassName}
              />
            </Field>

            <Field label="Latitude *">
              <input
                required
                type="number"
                step="any"
                value={formData.location.lat}
                onChange={(event) => setFormData({
                  ...formData,
                  location: { ...formData.location, lat: Number(event.target.value) },
                })}
                className={fieldClassName}
              />
            </Field>

            <Field label="Longitude *">
              <input
                required
                type="number"
                step="any"
                value={formData.location.lng}
                onChange={(event) => setFormData({
                  ...formData,
                  location: { ...formData.location, lng: Number(event.target.value) },
                })}
                className={fieldClassName}
              />
            </Field>
          </div>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-[#b99d9d]">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {amenityOptions.map((amenity) => (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  className={`rounded-full px-3 py-1.5 text-sm transition-colors ${formData.amenities?.includes(amenity)
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 dark:bg-[#1f1212] text-slate-700 dark:text-[#b99d9d] hover:bg-gray-300 dark:hover:bg-[#2a1a1a]'
                    }`}
                >
                  {amenity}
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-[#b99d9d]">Movie IDs</h3>
            <p className="text-sm text-slate-500 dark:text-[#b99d9d]">
              Select the movies currently running in this theater.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {movies.map((movie) => (
                <button
                  key={movie._id}
                  type="button"
                  onClick={() => toggleMovie(movie._id)}
                  className={`flex items-center gap-3 rounded-xl border px-3 py-3 text-left transition-colors ${selectedMovies.includes(movie._id)
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-200 dark:border-[#392828] bg-slate-50 dark:bg-[#120a0a] hover:bg-gray-100 dark:hover:bg-[#1f1212]'
                    }`}
                >
                  <div className="relative h-12 w-9 shrink-0 overflow-hidden rounded-lg">
                    <Image src={getImage(movie.poster, 'movies')} alt={movie.title} fill className="object-cover" sizes="36px" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{movie.title}</p>
                    <p className="text-xs text-slate-500 dark:text-[#b99d9d]">{movie._id}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <div className="flex justify-end gap-3 pt-2">
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
              className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors disabled:opacity-60"
            >
              {isSubmitting ? 'Saving...' : theater ? 'Update Theater' : 'Create Theater'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, className = '', children }: { label: string; className?: string; children: React.ReactNode }) {
  return (
    <label className={`space-y-2 ${className}`}>
      <span className="block text-sm font-medium text-slate-700 dark:text-[#b99d9d]">{label}</span>
      {children}
    </label>
  );
}
