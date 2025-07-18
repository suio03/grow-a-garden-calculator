'use client'

import { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import { Slider } from '@/components/ui/slider'
import { useTranslations } from 'next-intl'
// Import data from JSON files
import fruitsData from '@/data/fruits.json'
import mutationsData from '@/data/mutations.json'
import configData from '@/data/config.json'

const { fruits, values: fruitValues, cropData } = fruitsData as {
    fruits: string[],
    values: Record<string, number>,
    cropData: Record<string, { minimumValue?: number, minimumWeight?: number }>
}
const mutationCategories = mutationsData
const config = configData

function formatName(name: string) {
    return name
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .trim()
}

function formatValue(value: number): string {
    if (value >= 1000000000000) {
        return `${(value / 1000000000000).toFixed(1)} Trillion`
    } else if (value >= 1000000000) {
        return `${(value / 1000000000).toFixed(1)} Billion`
    } else if (value >= 1000000) {
        return `${(value / 1000000).toFixed(1)} Million`
    } else if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}K`
    }
    return value.toString()
}

function formatWithCommas(value: number): string {
    return value.toLocaleString()
}



export default function FruitGallery() {
    const t = useTranslations('page')
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCrop, setSelectedCrop] = useState<string>(config.defaults.selectedCrop)
    const [cropSectionOpen, setCropSectionOpen] = useState(true)
    const [mutationSectionOpen, setMutationSectionOpen] = useState(false)
    const [selectedMutations, setSelectedMutations] = useState<{
        growth: string
        temperature: string
        environmental: Set<string>
    }>({
        growth: config.defaults.mutations.growth,
        temperature: config.defaults.mutations.temperature,
        environmental: new Set(config.defaults.mutations.environmental)
    })
    const [mutationSearchQuery, setMutationSearchQuery] = useState('')
    const [maxAllEnabled, setMaxAllEnabled] = useState(false)
    const [weight, setWeight] = useState<number | string>(config.defaults.weight)
    const [quantity, setQuantity] = useState<number | string>(config.defaults.quantity)
    const [friendBoost, setFriendBoost] = useState(config.defaults.friendBoost)

    // Update weight when crop changes
    useEffect(() => {
        const cropInfo = cropData[selectedCrop]
        if (cropInfo?.minimumWeight) {
            setWeight(cropInfo.minimumWeight)
        } else {
            setWeight(config.defaults.weight)
        }
    }, [selectedCrop])

    const filteredFruits = useMemo(() => {
        return fruits.filter(fruit =>
            formatName(fruit).toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [searchQuery])

    const filteredEnvironmentalMutations = useMemo(() => {
        return mutationCategories.environmental.filter(mutation =>
            mutation.name.toLowerCase().includes(mutationSearchQuery.toLowerCase())
        )
    }, [mutationSearchQuery])

    const calculatedValue = useMemo(() => {
        // Get crop-specific data or fallback to old system
        const cropInfo = cropData[selectedCrop]
        const minimumValue = cropInfo?.minimumValue || fruitValues[selectedCrop] || 18
        const minimumWeight = cropInfo?.minimumWeight || config.defaults.weight

        const actualWeight = typeof weight === 'string' ? parseFloat(weight) || config.defaults.weight : weight
        const quantityValue = typeof quantity === 'string' ? parseInt(quantity) || config.defaults.quantity : quantity

        // Calculate scaled value based on weight
        let scaledValue
        if (actualWeight < minimumWeight) {
            // Below minimum weight: use minimum value directly
            scaledValue = minimumValue
        } else {
            // Above minimum weight: scale proportionally
            scaledValue = minimumValue * (actualWeight / minimumWeight)
        }

        // Calculate mutations: Growth × (Environmental + Temperature)(sum)
        let growthMultiplier = 1
        let environmentalSum = 0

        // Growth mutation - multiply
        const growthMutation = mutationCategories.growth.find(m => m.name === selectedMutations.growth)
        if (growthMutation && !growthMutation.isDefault) {
            growthMultiplier = growthMutation.multiplier
        }

        // Environmental mutations - add them up
        selectedMutations.environmental.forEach(mutationName => {
            const envMutation = mutationCategories.environmental.find(m => m.name === mutationName)
            if (envMutation) {
                environmentalSum += envMutation.multiplier
            }
        })

        // Temperature mutation - add to environmental sum
        const tempMutation = mutationCategories.temperature.find(m => m.name === selectedMutations.temperature)
        if (tempMutation && !tempMutation.isDefault) {
            environmentalSum += tempMutation.multiplier
        }

        // If no mutations in the sum, use 1 instead of 0
        if (environmentalSum === 0) {
            environmentalSum = 1
        }

        // Total mutation effect: growth × environmental(including temperature)
        const totalMutationMultiplier = growthMultiplier * environmentalSum

        // Calculate base value first
        const baseCalculation = scaledValue * totalMutationMultiplier

        // Apply friend boost: value + value * friendBoost
        const friendBoostAmount = baseCalculation * (friendBoost / 100)
        const valueWithFriendBoost = baseCalculation + friendBoostAmount

        // Apply quantity (multiply)
        return Math.floor(valueWithFriendBoost * quantityValue)
    }, [selectedCrop, selectedMutations, friendBoost, quantity, weight])

    // Memoized calculation details for display
    const calculationDetails = useMemo(() => {
        const actualWeight = typeof weight === 'string' ? parseFloat(weight) || config.defaults.weight : weight
        const quantityValue = typeof quantity === 'string' ? parseInt(quantity) || config.defaults.quantity : quantity

        // Count total mutations including temperature
        let totalMutations = selectedMutations.environmental.size
        if (selectedMutations.temperature !== 'Default') {
            totalMutations += 1
        }

        return {
            growth: selectedMutations.growth !== 'Default' ? selectedMutations.growth : 'None',
            mutations: totalMutations > 0 ? `${totalMutations} active` : 'None',
            weight: `${actualWeight}kg`,
            quantity: quantityValue,
            friendBoost: friendBoost > 0 ? `${friendBoost}%` : 'None'
        }
    }, [selectedMutations, weight, quantity, friendBoost])

    const toggleEnvironmentalMutation = (mutationName: string) => {
        const newEnvironmental = new Set(selectedMutations.environmental)
        if (newEnvironmental.has(mutationName)) {
            newEnvironmental.delete(mutationName)
        } else {
            newEnvironmental.add(mutationName)
        }
        setSelectedMutations(prev => ({
            ...prev,
            environmental: newEnvironmental
        }))
    }

    const toggleMaxAll = () => {
        if (maxAllEnabled) {
            // Turn off all mutations
            setSelectedMutations({
                growth: 'Default',
                temperature: 'Default',
                environmental: new Set()
            })
            setMaxAllEnabled(false)
        } else {
            // Turn on all mutations
            setSelectedMutations({
                growth: 'Rainbow',
                temperature: 'Frozen',
                environmental: new Set(mutationCategories.environmental.map(m => m.name))
            })
            setMaxAllEnabled(true)
        }
    }

    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value
        // Allow empty input or partial typing
        if (inputValue === '' || inputValue === '.' || inputValue === '-') {
            setWeight(inputValue)
            return
        }
        const value = parseFloat(inputValue)
        if (!isNaN(value) && value >= 0) {
            setWeight(value)
        }
    }

    const handleWeightBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const inputValue = e.target.value
        const value = parseFloat(inputValue)
        if (inputValue === '' || isNaN(value) || value < 0) {
            setWeight(config.defaults.weight) // Reset to default
        } else {
            setWeight(value)
        }
    }

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value
        // Allow empty input
        if (inputValue === '') {
            setQuantity(inputValue)
            return
        }
        const value = parseInt(inputValue)
        if (!isNaN(value) && value >= config.inputs.quantity.min) {
            setQuantity(Math.floor(value)) // Ensure integer
        }
    }

    const handleQuantityBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const inputValue = e.target.value
        const value = parseInt(inputValue)
        if (inputValue === '' || isNaN(value) || value < config.inputs.quantity.min) {
            setQuantity(config.defaults.quantity) // Reset to default
        } else {
            setQuantity(Math.floor(value))
        }
    }

    const getSelectedMutationTags = () => {
        const tags = []
        if (maxAllEnabled) {
            tags.push({ name: 'Max All', color: 'bg-purple-600' })
        }
        if (selectedMutations.growth !== 'Default') {
            tags.push({
                name: `${selectedMutations.growth} ×${mutationCategories.growth.find(m => m.name === selectedMutations.growth)?.multiplier}`,
                color: 'bg-pink-600'
            })
        }

        // Calculate environmental + temperature total (temperature is included in environmental now)
        if (selectedMutations.environmental.size > 0 || selectedMutations.temperature !== 'Default') {
            let totalMultiplier = 0

            // Add environmental mutations
            Array.from(selectedMutations.environmental).forEach(name => {
                const mutation = mutationCategories.environmental.find(m => m.name === name)
                totalMultiplier += (mutation?.multiplier || 0)
            })

            // Add temperature mutation
            if (selectedMutations.temperature !== 'Default') {
                const tempMutation = mutationCategories.temperature.find(m => m.name === selectedMutations.temperature)
                totalMultiplier += (tempMutation?.multiplier || 0)
            }

            tags.push({
                name: `Mutations ×${totalMultiplier}`,
                color: 'bg-purple-600'
            })
        }
        return tags
    }

    return (
        <div className="relative">
            <div className="px-4 py-8">
                <div className="space-y-6 max-w-6xl mx-auto">
                    {/* Top Row: Crop Selection + Live Results */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        {/* Left: Crop Selection (60%) */}
                        <div className="lg:col-span-3">
                            <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl overflow-hidden shadow-lg">
                                <div className="flex items-center justify-between p-6">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">🌱</span>
                                        <h2 className="text-xl font-bold text-gray-800">{t('crop-section.title')}</h2>
                                    </div>
                                    <button
                                        onClick={() => setCropSectionOpen(!cropSectionOpen)}
                                        className="text-gray-500 hover:text-gray-700 transition-colors"
                                    >
                                        {t('crop-section.details')}
                                    </button>
                                </div>

                                <div className="px-6 pb-6">
                                    <button
                                        onClick={() => setCropSectionOpen(!cropSectionOpen)}
                                        className="w-full bg-white/50 border border-gray-300 rounded-lg p-4 flex items-center justify-between hover:bg-white/70 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 flex items-center justify-center">
                                                <Image
                                                    src={`/fruits/${selectedCrop}.webp`}
                                                    alt={formatName(selectedCrop)}
                                                    width={32}
                                                    height={32}
                                                    className="object-contain"
                                                />
                                            </div>
                                            <span className="font-medium text-gray-800">{formatName(selectedCrop)}</span>
                                        </div>
                                        <svg
                                            className={`w-5 h-5 transition-transform ${cropSectionOpen ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {cropSectionOpen && (
                                        <div className="mt-4 space-y-4">
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder={t('crop-section.search-placeholder')}
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    className="w-full pl-10 pr-4 py-3 bg-white/60 border-2 border-purple-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:bg-white/80 transition-all"
                                                />
                                            </div>

                                            <div className={`grid grid-cols-3 sm:grid-cols-4 gap-4 max-h-80 overflow-y-auto justify-items-center px-2 py-2`}>
                                                {filteredFruits.map((fruit) => (
                                                    <button
                                                        key={fruit}
                                                        onClick={() => {
                                                            setSelectedCrop(fruit)
                                                            setCropSectionOpen(false)
                                                        }}
                                                        className={`w-full max-w-[120px] p-4 rounded-lg border transition-all shadow-sm hover:shadow-md ${selectedCrop === fruit
                                                            ? 'bg-purple-100 border-purple-400 ring-2 ring-purple-200'
                                                            : 'bg-white/60 border-gray-300 hover:bg-white/80 hover:border-purple-300'
                                                            }`}
                                                    >
                                                        <div className="w-8 h-8 mx-auto mb-3 flex items-center justify-center">
                                                            <Image
                                                                src={`/fruits/${fruit}.webp`}
                                                                alt={formatName(fruit)}
                                                                width={48}
                                                                height={48}
                                                                className="object-contain"
                                                            />
                                                        </div>
                                                        <div className="text-xs font-medium text-center text-gray-800">{formatName(fruit)}</div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right: Live Results (40%) */}
                        <div className="lg:col-span-2">
                            <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg p-6 lg:sticky lg:top-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-2xl">💰</span>
                                    <h2 className="text-lg font-bold text-gray-800">{t('live-results.title')}</h2>
                                </div>

                                {/* Main Value Display */}
                                <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-200 rounded-xl p-4 text-center shadow-sm mb-4">
                                    <div className="text-2xl font-bold text-purple-700 mb-1 flex items-center justify-center gap-1">
                                        <Image
                                            src="/sheckle.webp"
                                            alt="Sheckle"
                                            width={24}
                                            height={24}
                                            className="object-contain"
                                        />
                                        {formatWithCommas(calculatedValue)}
                                    </div>
                                    <div className="text-sm text-purple-600">
                                        ≈{formatValue(calculatedValue)}
                                    </div>
                                </div>

                                {/* Quick Details */}
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">{t('live-results.crop-name')}:</span>
                                        <span className="text-gray-800 font-medium">{formatName(selectedCrop)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">{t('live-results.weight')}:</span>
                                        <span className="text-gray-800 font-medium">{calculationDetails.weight}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">{t('live-results.quantity')}:</span>
                                        <span className="text-gray-800 font-medium">{calculationDetails.quantity}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">{t('live-results.mutations')}:</span>
                                        <span className="text-gray-800 font-medium">{calculationDetails.mutations}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Middle Row: Quick Controls */}
                    <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-2xl">⚡</span>
                            <h2 className="text-lg font-bold text-gray-800">{t('quick-controls.title')}</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">{t('quick-controls.weight')} (kg)</label>
                                <input
                                    type="number"
                                    min={config.inputs.weight.min}
                                    step={config.inputs.weight.step}
                                    value={weight}
                                    onChange={handleWeightChange}
                                    onBlur={handleWeightBlur}
                                    className="w-full px-4 py-3 bg-white/60 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-purple-400 focus:bg-white/80 transition-all shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">{t('quick-controls.quantity')} (pcs)</label>
                                <input
                                    type="number"
                                    min={config.inputs.quantity.min}
                                    step={config.inputs.quantity.step}
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    onBlur={handleQuantityBlur}
                                    className="w-full px-4 py-3 bg-white/60 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-purple-400 focus:bg-white/80 transition-all shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700">{t('quick-controls.friend-boost')} ({friendBoost}%)</label>
                                <div className="px-4 py-3 bg-white/50 border border-gray-300 rounded-lg">
                                    <Slider
                                        value={[friendBoost]}
                                        onValueChange={(value) => setFriendBoost(value[0])}
                                        min={config.friendBoost.min}
                                        max={config.friendBoost.max}
                                        step={config.friendBoost.step}
                                        className="w-full [&>[data-slot='slider-track']]:bg-gray-300 [&>[data-slot='slider-range']]:bg-purple-500 [&>[data-slot='slider-thumb']]:bg-purple-600 [&>[data-slot='slider-thumb']]:border-purple-400 [&>[data-slot='slider-thumb']]:shadow-md"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row: Advanced Options (Mutations) */}
                    <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl overflow-hidden shadow-lg">
                        <div className="flex items-center justify-between p-6">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">🧬</span>
                                <h2 className="text-xl font-bold text-gray-800">{t('mutations.title')}</h2>
                            </div>
                            <button
                                onClick={() => setMutationSectionOpen(!mutationSectionOpen)}
                                className="flex items-center gap-2 px-4 py-2 bg-white/60 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-white/80 hover:border-purple-300 transition-all shadow-sm"
                            >
                                {mutationSectionOpen ? t('mutations.hide-advanced') : t('mutations.show-advanced')}
                                <svg
                                    className={`w-4 h-4 transition-transform ${mutationSectionOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>

                        {/* Show selected mutations preview when collapsed */}
                        {!mutationSectionOpen && (
                            <div className="px-6 pb-6">
                                <div className="flex flex-wrap gap-2">
                                    {getSelectedMutationTags().length > 0 ? (
                                        getSelectedMutationTags().map((tag, index) => (
                                            <span
                                                key={index}
                                                className={`px-3 py-1 rounded-full text-sm font-medium text-white shadow-sm ${tag.color}`}
                                            >
                                                {tag.name}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-500 text-sm">{t('mutations.no-mutations-selected')}</span>
                                    )}
                                </div>
                            </div>
                        )}

                        {mutationSectionOpen && (
                            <div className="px-6 pb-6">
                                <div className="space-y-6">
                                    {/* Search */}
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder={t('mutations.search-placeholder')}
                                            value={mutationSearchQuery}
                                            onChange={(e) => setMutationSearchQuery(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 bg-white/60 border border-gray-300 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:bg-white/80 transition-all"
                                        />
                                    </div>

                                    {/* Max All Toggle */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-800 font-medium">{t('mutations.max-all')}</span>
                                        <button
                                            onClick={toggleMaxAll}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shadow-sm ${maxAllEnabled ? 'bg-purple-500' : 'bg-gray-300'}`}
                                        >
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${maxAllEnabled ? 'translate-x-6' : 'translate-x-1'}`}
                                            />
                                        </button>
                                    </div>

                                    {/* Growth Mutations */}
                                    <div>
                                        <h3 className="text-lg font-bold mb-3 text-gray-800">{t('mutations.Growth')}</h3>
                                        <div className="grid grid-cols-3 gap-3">
                                            {mutationCategories.growth.map((mutation) => (
                                                <button
                                                    key={mutation.name}
                                                    onClick={() => setSelectedMutations(prev => ({ ...prev, growth: mutation.name }))}
                                                    className={`px-4 py-3 rounded-2xl text-sm font-medium transition-all shadow-sm hover:shadow-md ${selectedMutations.growth === mutation.name
                                                        ? mutation.isDefault
                                                            ? 'bg-green-100 border-2 border-green-400 text-green-700 ring-2 ring-green-200'
                                                            : 'bg-pink-100 border-2 border-pink-400 text-pink-700 ring-2 ring-pink-200'
                                                        : 'bg-white/60 border border-gray-300 text-gray-700 hover:bg-white/80 hover:border-purple-300'
                                                        }`}
                                                >
                                                    <div className="font-bold">{mutation.name}</div>
                                                    <div className="text-xs opacity-75">×{mutation.multiplier}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Temperature Mutations */}
                                    <div>
                                        <h3 className="text-lg font-bold mb-3 text-gray-800">{t('mutations.temperature')}</h3>
                                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                                            {mutationCategories.temperature.map((mutation) => (
                                                <button
                                                    key={mutation.name}
                                                    onClick={() => setSelectedMutations(prev => ({ ...prev, temperature: mutation.name }))}
                                                    className={`px-4 py-3 rounded-2xl text-sm font-medium transition-all shadow-sm hover:shadow-md ${selectedMutations.temperature === mutation.name
                                                        ? mutation.isDefault
                                                            ? 'bg-green-100 border-2 border-green-400 text-green-700 ring-2 ring-green-200'
                                                            : 'bg-blue-100 border-2 border-blue-400 text-blue-700 ring-2 ring-blue-200'
                                                        : 'bg-white/60 border border-gray-300 text-gray-700 hover:bg-white/80 hover:border-purple-300'
                                                        }`}
                                                >
                                                    <div className="font-bold">{mutation.name}</div>
                                                    <div className="text-xs opacity-75">×{mutation.multiplier}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Environmental Mutations */}
                                    <div>
                                        <h3 className="text-lg font-bold mb-3 text-gray-800">{t('mutations.environmental')}</h3>
                                        <div className={`grid gap-3 ${config.ui.environmentalMutations.mobile} ${config.ui.environmentalMutations.tablet} ${config.ui.environmentalMutations.desktop} ${config.ui.environmentalMutations.maxHeight} overflow-y-auto`}>
                                            {filteredEnvironmentalMutations.map((mutation) => (
                                                <button
                                                    key={mutation.name}
                                                    onClick={() => toggleEnvironmentalMutation(mutation.name)}
                                                    className={`px-3 py-2 rounded-2xl text-sm font-medium transition-all shadow-sm hover:shadow-md ${selectedMutations.environmental.has(mutation.name)
                                                        ? 'bg-purple-100 border-2 border-purple-400 text-purple-700 ring-2 ring-purple-200'
                                                        : 'bg-white/60 border border-gray-300 text-gray-700 hover:bg-white/80 hover:border-purple-300'
                                                        }`}
                                                >
                                                    <div className="font-bold">{mutation.name}</div>
                                                    <div className="text-xs opacity-75">×{mutation.multiplier}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}