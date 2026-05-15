'use client';

import { useEffect, useMemo, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { MdClose } from 'react-icons/md';
import { useTheater } from '@/contexts/TheaterContext';
import { Theater, CreateTheaterRequest, UpdateTheaterRequest, CreateTheaterPayload, UpdateTheaterPayload } from '@/interfaces/theaterInterface';
import { Movie } from '@/interfaces/movieInterface';
import getImage from '@/utils/imageUrl';

interface AddEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  theater?: Theater;
  movies: Movie[];
}

const amenityOptions = ['Parking', 'Wheelchair', 'Food & Beverage', 'Dolby', 'IMAX', 'Recliners', '4K'];

export function AddEditModal({ isOpen, onClose, theater, movies }: AddEditModalProps) {
  const { createTheater, updateTheater } = useTheater();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | StaticImageData>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
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
      const normalizedScreens = (theater.screens || []).map((s) => ({
        ...s,
        shows: (s.shows || []).map((show) => ({
          ...show,
          movie:
            show.movie && typeof show.movie === 'object' && '_id' in show.movie
              ? (show.movie as any)._id
              : String(show.movie || ''),
        })),
      }));

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
        screens: normalizedScreens,
        reviews: theater.reviews || [],
        movies: theater.movies?.map((movie) => movie._id).filter((id): id is string => !!id) || [],
      });
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

  const presetShows = [
    { key: 'custom', label: 'Custom', start: '', end: '' },
    { key: 'morning', label: 'Morning Show', start: '09:00', end: '11:30' },
    { key: 'noon', label: 'Noon Show', start: '12:00', end: '14:30' },
    { key: 'evening', label: 'Evening Show', start: '17:30', end: '20:00' },
    { key: 'night', label: 'Night Show', start: '20:30', end: '23:00' },
  ];

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

    setImagePreview('');
    setFormData((prev) => ({ ...prev, screens: [] }));
  };

  const addScreen = () => {
    setFormData((prev) => ({
      ...prev,
      screens: [
        ...(prev.screens || []),
        { screen_id: `screen_${String((prev.screens?.length ?? 0) + 1).padStart(2, '0')}`, name: '', type: '2D', shows: [] },
      ],
    }));
  };

  const updateScreen = (index: number, field: string, value: unknown) => {
    setFormData((prev) => {
      const screens = [...(prev.screens || [])];
      screens[index] = { ...screens[index], [field]: value };
      return { ...prev, screens };
    });
  };

  const removeScreen = (index: number) => {
    setFormData((prev) => ({ ...prev, screens: (prev.screens || []).filter((_, i) => i !== index) }));
  };

  const addShow = (screenIndex: number) => {
    setFormData((prev) => {
      const screens = [...(prev.screens || [])];
      const screen = { ...screens[screenIndex] };
      screen.shows = [...(screen.shows || []), { name: '', movie: '', date: '', startTime: '', endTime: '', price: 0, currency: 'LKR', status: 'available' }];
      screens[screenIndex] = screen;
      return { ...prev, screens };
    });
  };

  const updateShow = (screenIndex: number, showIndex: number, field: string, value: unknown) => {
    setFormData((prev) => {
      const screens = [...(prev.screens || [])];
      const screen = { ...screens[screenIndex] };
      const shows = [...(screen.shows || [])];
      shows[showIndex] = { ...shows[showIndex], [field]: value };
      screen.shows = shows;
      screens[screenIndex] = screen;
      return { ...prev, screens };
    });
  };

  const removeShow = (screenIndex: number, showIndex: number) => {
    setFormData((prev) => {
      const screens = [...(prev.screens || [])];
      const screen = { ...screens[screenIndex] };
      screen.shows = (screen.shows || []).filter((_, i) => i !== showIndex);
      screens[screenIndex] = screen;
      return { ...prev, screens };
    });
  };

  const toggleAmenity = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities?.includes(amenity)
        ? prev.amenities.filter((item) => item !== amenity)
        : [...(prev.amenities || []), amenity],
    }));
  };


  const handleImageChange = (value: string | StaticImageData) => {
    setFormData((prev) => ({ ...prev, image: value }));
    setImagePreview(value);
  };

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      let payload: CreateTheaterRequest | UpdateTheaterRequest | FormData = {
        ...formData,
      };

      if (imageFile) {
        const fd = new FormData();
        const obj = payload as Record<string, unknown>;
        for (const [key, value] of Object.entries(obj)) {
          if (value === undefined || value === null) continue;
          if (value instanceof File) {
            fd.append(key, value);
          } else if (Array.isArray(value)) {
            for (const item of value) {
              if (item instanceof File) fd.append(key, item);
              else if (typeof item === 'object') fd.append(key, JSON.stringify(item));
              else fd.append(key, String(item));
            }
          } else if (typeof value === 'object') {
            fd.append(key, JSON.stringify(value));
          } else {
            fd.append(key, String(value));
          }
        }
        payload = fd;
      }

      if (theater && theater._id) {
        await updateTheater(theater._id, payload as UpdateTheaterPayload);
      } else {
        await createTheater(payload as CreateTheaterPayload);
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

            <Field label="Image *" className="md:col-span-2">
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFile}
                  className={`${fieldClassName} h-12`}
                />

              </div>
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
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-[#b99d9d]">Screens & Shows</h3>
              <button type="button" onClick={addScreen} className="text-sm text-primary hover:text-primary-dark">+ Add Screen</button>
            </div>

            <div className="space-y-4">
              {(formData.screens || []).map((screen, si) => (
                <div key={si} className="p-4 rounded-lg border border-gray-200 dark:border-[#392828] bg-slate-50 dark:bg-[#120a0a]">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                      <input
                        placeholder="Screen name"
                        value={screen.name}
                        onChange={(e) => updateScreen(si, 'name', e.target.value)}
                        className="rounded-lg border border-gray-300 dark:border-[#392828] px-3 py-2 bg-white dark:bg-[#120a0a] text-sm"
                      />
                      <input
                        placeholder="Screen ID"
                        value={screen.screen_id}
                        onChange={(e) => updateScreen(si, 'screen_id', e.target.value)}
                        className="rounded-lg border border-gray-300 dark:border-[#392828] px-3 py-2 bg-white dark:bg-[#120a0a] text-sm"
                      />
                      <select value={screen.type} onChange={(e) => updateScreen(si, 'type', e.target.value)} className="rounded-lg border border-gray-300 dark:border-[#392828] px-3 py-2 bg-white dark:bg-[#120a0a] text-sm">
                        <option value="2D">2D</option>
                        <option value="3D">3D</option>
                        <option value="IMAX">IMAX</option>
                        <option value="4DX">4DX</option>
                      </select>
                    </div>
                    <div>
                      <button type="button" onClick={() => removeScreen(si)} className="text-red-500 hover:text-red-700">Remove</button>
                    </div>
                  </div>

                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-slate-500 dark:text-[#b99d9d]">Shows</p>
                      <button type="button" onClick={() => addShow(si)} className="text-sm text-primary hover:text-primary-dark">+ Add Show</button>
                    </div>

                    {(screen.shows || []).map((show, sj) => (
                      <div key={sj} className="grid grid-cols-1 md:grid-cols-6 gap-2 items-center p-2 bg-white dark:bg-[#0f0b0b] rounded-md">
                        <select
                          className="col-span-2 rounded-lg border border-gray-300 dark:border-[#392828] px-3 py-2 bg-white dark:bg-[#120a0a] text-sm"
                          value={typeof show.movie === 'string' ? show.movie : (show.movie as any)?._id || ''}
                          onChange={(e) => updateShow(si, sj, 'movie', e.target.value)}
                        >
                          <option value="">Select movie</option>
                          {movies.map((m) => (
                            <option key={m._id} value={m._id}>{m.title}</option>
                          ))}
                        </select>

                        <input
                          type="date"
                          className="col-span-1 rounded-lg border border-gray-300 dark:border-[#392828] px-3 py-2 bg-white dark:bg-[#120a0a] text-sm"
                          value={show.date}
                          onChange={(e) => updateShow(si, sj, 'date', e.target.value)}
                        />

                        <div className="col-span-2 md:col-span-1">
                          <select
                            className="w-full rounded-lg border border-gray-300 dark:border-[#392828] px-3 py-2 bg-white dark:bg-[#120a0a] text-sm"
                            value={presetShows.find(p => p.label === (show.name || ''))?.key || 'custom'}
                            onChange={(e) => {
                              const key = e.target.value;
                              const preset = presetShows.find(p => p.key === key) as typeof presetShows[0];
                              if (preset && preset.key !== 'custom') {
                                updateShow(si, sj, 'name', preset.label);
                                updateShow(si, sj, 'startTime', preset.start);
                                updateShow(si, sj, 'endTime', preset.end);
                              } else {
                                updateShow(si, sj, 'name', '');
                              }
                            }}
                          >
                            {presetShows.map((p) => (
                              <option key={p.key} value={p.key}>{p.label}</option>
                            ))}
                          </select>
                        </div>

                        <input
                          placeholder="Show name"
                          className="col-span-1 md:col-span-1 rounded-lg border border-gray-300 dark:border-[#392828] px-3 py-2 bg-white dark:bg-[#120a0a] text-sm"
                          value={show.name || ''}
                          onChange={(e) => updateShow(si, sj, 'name', e.target.value)}
                        />

                        <input
                          type="time"
                          className="col-span-1 rounded-lg border border-gray-300 dark:border-[#392828] px-3 py-2 bg-white dark:bg-[#120a0a] text-sm"
                          value={show.startTime}
                          onChange={(e) => updateShow(si, sj, 'startTime', e.target.value)}
                        />

                        <input
                          type="time"
                          className="col-span-1 rounded-lg border border-gray-300 dark:border-[#392828] px-3 py-2 bg-white dark:bg-[#120a0a] text-sm"
                          value={show.endTime}
                          onChange={(e) => updateShow(si, sj, 'endTime', e.target.value)}
                        />

                        <input
                          type="number"
                          className="col-span-1 rounded-lg border border-gray-300 dark:border-[#392828] px-3 py-2 bg-white dark:bg-[#120a0a] text-sm"
                          value={show.price}
                          onChange={(e) => updateShow(si, sj, 'price', Number(e.target.value))}
                        />

                        <div className="col-span-1 flex flex-col md:flex-row items-center gap-2">
                          <select
                            className="rounded-lg border border-gray-300 dark:border-[#392828] px-3 py-2 bg-white dark:bg-[#120a0a] text-sm"
                            value={show.currency || 'LKR'}
                            onChange={(e) => updateShow(si, sj, 'currency', e.target.value)}
                          >
                            <option value="LKR">LKR</option>
                          </select>

                          <select
                            className="rounded-lg border border-gray-300 dark:border-[#392828] px-3 py-2 bg-white dark:bg-[#120a0a] text-sm"
                            value={show.status || 'available'}
                            onChange={(e) => updateShow(si, sj, 'status', e.target.value)}
                          >
                            <option value="available">available</option>
                            <option value="sold-out">sold-out</option>
                            <option value="almost-full">almost-full</option>
                            <option value="fast-filling">fast-filling</option>
                          </select>

                          <button type="button" onClick={() => removeShow(si, sj)} className="text-red-500 hover:text-red-700">✕</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
