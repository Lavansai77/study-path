import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { Universities } from '@/entities';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Image } from '@/components/ui/image';
import { Search, MapPin, DollarSign, Award } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function UniversitiesPage() {
  const [universities, setUniversities] = useState<Universities[]>([]);
  const [filteredUniversities, setFilteredUniversities] = useState<Universities[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [budgetFilter, setBudgetFilter] = useState('all');

  useEffect(() => {
    loadUniversities();
  }, []);

  useEffect(() => {
    filterUniversities();
  }, [universities, searchQuery, locationFilter, budgetFilter]);

  const loadUniversities = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<Universities>('universities');
      setUniversities(result.items);
    } catch (error) {
      console.error('Failed to load universities:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterUniversities = () => {
    let filtered = [...universities];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(uni =>
        uni.universityName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.programsOffered?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Location filter
    if (locationFilter !== 'all') {
      filtered = filtered.filter(uni => uni.location === locationFilter);
    }

    // Budget filter
    if (budgetFilter !== 'all') {
      filtered = filtered.filter(uni => {
        const budget = uni.estimatedBudget || 0;
        switch (budgetFilter) {
          case 'under-30k':
            return budget < 30000;
          case '30k-50k':
            return budget >= 30000 && budget < 50000;
          case '50k-70k':
            return budget >= 50000 && budget < 70000;
          case 'above-70k':
            return budget >= 70000;
          default:
            return true;
        }
      });
    }

    setFilteredUniversities(filtered);
  };

  const uniqueLocations = Array.from(new Set(universities.map(u => u.location).filter(Boolean)));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-16 space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary">
            Discover Universities
          </h1>
          <p className="font-paragraph text-lg text-secondary max-w-3xl">
            Explore our curated selection of universities worldwide. Filter by location, budget, and programs to find your perfect match.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="p-6 border-primary/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary" />
                <Input
                  placeholder="Search universities or programs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>

              {/* Location Filter */}
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {uniqueLocations.map(location => (
                    <SelectItem key={location} value={location!}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Budget Filter */}
              <Select value={budgetFilter} onValueChange={setBudgetFilter}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="All Budgets" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Budgets</SelectItem>
                  <SelectItem value="under-30k">Under $30,000</SelectItem>
                  <SelectItem value="30k-50k">$30,000 - $50,000</SelectItem>
                  <SelectItem value="50k-70k">$50,000 - $70,000</SelectItem>
                  <SelectItem value="above-70k">Above $70,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
        </motion.div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="font-paragraph text-base text-secondary">
            {isLoading ? 'Loading...' : `${filteredUniversities.length} ${filteredUniversities.length === 1 ? 'university' : 'universities'} found`}
          </p>
        </div>

        {/* Universities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
          {isLoading ? null : filteredUniversities.length > 0 ? (
            filteredUniversities.map((university, index) => (
              <motion.div
                key={university._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <Link to={`/universities/${university._id}`}>
                  <Card className="overflow-hidden border-primary/20 hover:border-primary transition-all duration-300 h-full flex flex-col">
                    {university.campusImage && (
                      <div className="aspect-video overflow-hidden">
                        <Image
                          src={university.campusImage}
                          alt={`${university.universityName} campus`}
                          width={400}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6 flex-1 flex flex-col space-y-4">
                      <div className="flex-1 space-y-3">
                        <h3 className="font-heading text-2xl text-primary line-clamp-2">
                          {university.universityName}
                        </h3>
                        
                        <div className="space-y-2">
                          {university.location && (
                            <div className="flex items-center gap-2 text-secondary">
                              <MapPin className="h-4 w-4 flex-shrink-0" />
                              <span className="font-paragraph text-sm">{university.location}</span>
                            </div>
                          )}
                          
                          {university.estimatedBudget && (
                            <div className="flex items-center gap-2 text-secondary">
                              <DollarSign className="h-4 w-4 flex-shrink-0" />
                              <span className="font-paragraph text-sm">
                                ${university.estimatedBudget.toLocaleString()} / year
                              </span>
                            </div>
                          )}
                          
                          {university.globalRanking && (
                            <div className="flex items-center gap-2 text-secondary">
                              <Award className="h-4 w-4 flex-shrink-0" />
                              <span className="font-paragraph text-sm">
                                Ranked #{university.globalRanking} globally
                              </span>
                            </div>
                          )}
                        </div>

                        {university.description && (
                          <p className="font-paragraph text-sm text-secondary line-clamp-3">
                            {university.description}
                          </p>
                        )}
                      </div>

                      <Button className="w-full h-11 mt-auto">
                        View Details
                      </Button>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="font-paragraph text-lg text-secondary">
                No universities found matching your criteria. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
