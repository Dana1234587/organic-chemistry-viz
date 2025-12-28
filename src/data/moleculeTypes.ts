/**
 * Molecule Data Types
 * Shared type definitions for molecule visualization data
 */

export interface MoleculeData {
    /** PDB format structure data */
    pdb: string;
    /** File format - pdb or sdf */
    format?: 'pdb' | 'sdf';
    /** PubChem Compound ID for fetching accurate SDF */
    pubchemCid?: number;
    /** RCSB PDB ligand ID for complex molecules */
    rcsbLigandId?: string;
    /** Display color for the molecule card */
    color: string;
    /** Emoji icon for the molecule */
    emoji: string;
    /** Chemical formula with subscripts */
    formula: string;
    /** Description of skeletal structure */
    skeletal: string;
    /** List of functional groups present */
    functionalGroups: string[];
    /** ASCII representation of 2D structure (optional) */
    structure2D?: string;
    /** SMILES notation (optional) */
    smiles?: string;
}

export type MoleculeName = string;
export type MoleculeRegistry = Record<MoleculeName, MoleculeData>;
