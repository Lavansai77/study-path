/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: applicationguidance
 * Interface for ApplicationGuidance
 */
export interface ApplicationGuidance {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  stepTitle?: string;
  /** @wixFieldType text */
  stageName?: string;
  /** @wixFieldType text */
  detailedDescription?: string;
  /** @wixFieldType text */
  actionableToDos?: string;
  /** @wixFieldType number */
  sequenceNumber?: number;
}


/**
 * Collection ID: applicationtasks
 * Interface for ApplicationTasks
 */
export interface ApplicationTasks {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  applicationGuidanceId?: string;
  /** @wixFieldType text */
  taskTitle?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType date */
  dueDate?: Date | string;
  /** @wixFieldType number */
  estimatedEffort?: number;
  /** @wixFieldType boolean */
  isOptional?: boolean;
  /** @wixFieldType url */
  resourceLink?: string;
}


/**
 * Collection ID: universities
 * Interface for Universities
 */
export interface Universities {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  universityName?: string;
  /** @wixFieldType text */
  location?: string;
  /** @wixFieldType number */
  estimatedBudget?: number;
  /** @wixFieldType text */
  programsOffered?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  campusImage?: string;
  /** @wixFieldType number */
  globalRanking?: number;
}
