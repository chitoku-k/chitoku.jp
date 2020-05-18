// Type definitions for algoliasearch-helper 2.26
// Project: https://community.algolia.com/algoliasearch-helper-js/
// Definitions by: Gordon Burgett <https://github.com/gburgett>
//                 Haroen Viaene <https://github.com/haroenv>
//                 Samuel Vaillant <https://github.com/samouss>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8

type ValueTypes<T> = T extends (infer U)[] ? U : never
type ManagedParameters = {
  [K in ValueTypes<SearchParameters['managedParameters']>]: SearchParameters[K]
}

export interface QueryParameters {
  index?: string
  disjunctiveFacets?: string[]
  hierarchicalFacets?: string[] | object[]
  facetsRefinements?: { [facet: string]: FacetList }
  facetsExcludes?: { [facet: string]: FacetList }
  disjunctiveFacetsRefinements?: { [facet: string]: FacetList }
  numericRefinements?: { [facet: string]: OperatorList }
  tagRefinements?: string[]
  hierarchicalFacetsRefinements?: { [facet: string]: FacetList }
  optionalTagFilters?: string
  optionalFacetFilters?: string
  enableExactOnSingleWordQuery?: boolean
}

export class SearchParameters implements QueryParameters {
  index?: string
  disjunctiveFacets?: string[]
  hierarchicalFacets?: string[] | object[]
  facetsRefinements?: { [facet: string]: string[]; }
  facetsExcludes?: { [facet: string]: string[]; }
  disjunctiveFacetsRefinements?: { [facet: string]: string[]; }
  numericRefinements?: { [facet: string]: OperatorList }
  tagRefinements?: string[]
  hierarchicalFacetsRefinements?: { [facet: string]: string[]; }
  optionalTagFilters?: string
  optionalFacetFilters?: string
  hitsPerPage?: number
  maxValuesPerFacet?: number
  minWordSizefor1Typo?: number
  minWordSizefor2Typos?: number
  minProximity?: any
  allowTyposOnNumericTokens?: boolean
  ignorePlurals?: boolean
  advancedSyntax?: boolean
  analytics?: boolean
  synonyms?: boolean
  replaceSynonymsInHighlight?: boolean
  highlightPreTag?: string
  highlightPostTag?: string
  distinct?: number | boolean
  aroundLatLng?: string
  aroundRadius?: number
  minimumAroundRadius?: number
  aroundPrecision?: number
  snippetEllipsisText?: string
  enableExactOnSingleWordQuery?: boolean
  query?: string
  filters?: string
  attributesToRetrieve?: string[]
  restrictSearchableAttributes?: string[]
  facets?: string[]
  facetingAfterDistinct?: boolean
  attributesToHighlight?: string[]
  attributesToSnippet?: string[]
  restrictHighlightAndSnippetArrays?: boolean
  page?: number
  offset?: number
  length?: number
  typoTolerance?: boolean
  disableTypoToleranceOnAttributes?: string[]
  aroundLatLngViaIP?: boolean
  insideBoundingBox?: number[][]
  queryType?: 'prefixAll' | 'prefixLast' | 'prefixNone'
  insidePolygon?: number[][]
  removeWordsIfNoResults?: 'none' | 'lastWords' | 'firstWords' | 'allOptional'
  optionalWords?: string[]
  removeStopWords?: boolean | string[]
  disableExactOnAttributes?: string[]
  exactOnSingleWordQuery?: 'none' | 'attribute' | 'word'
  alternativesAsExact?: ('ignorePlurals' | 'singleWordSynonym' | 'multiWordsSynonym')[]
  getRankingInfo?: boolean
  numericAttributesToIndex?: string[]
  numericAttributesForFiltering?: string[]
  numericFilters?: string[]
  tagFilters?: string[]
  facetFilters?: string[] | string[][]
  analyticsTags?: string[]
  nbShards?: number
  userData?: string | object
  managedParameters: [
    'index',
    'facets',
    'disjunctiveFacets',
    'facetsRefinements',
    'facetsExcludes',
    'disjunctiveFacetsRefinements',
    'numericRefinements',
    'tagRefinements',
    'hierarchicalFacets',
    'hierarchicalFacetsRefinements',
  ]
  constructor(newParameters?: QueryParameters)
  addDisjunctiveFacet(facet: string): SearchParameters
  addDisjunctiveFacetRefinement(facet: string, value: string): SearchParameters
  addExcludeRefinement(facet: string, value: string): SearchParameters
  addFacet(facet: string): SearchParameters
  addFacetRefinement(facet: string, value: string): SearchParameters
  addHierarchicalFacet(facet: any): SearchParameters
  addHierarchicalFacetRefinement(facet: string, path: string): SearchParameters
  addNumericRefinement(attribute: string, operator: Operator, value: number | number[]): SearchParameters
  addTagRefinement(tag: string): SearchParameters
  clearRefinements(attribute?: string | ((value: any, attribute: string, type: string) => any)): SearchParameters
  clearTags(): SearchParameters
  filter(filters: string[]): any
  getConjunctiveRefinements(facetName: string): string[]
  getDisjunctiveRefinements(facetName: string): string[]
  getExcludeRefinements(facetName: string): string[]
  getHierarchicalFacetBreadcrumb(facetName: string): string[]
  getHierarchicalFacetByName(hierarchicalFacetName: string): any
  getHierarchicalRefinement(facetName: string): string[]
  getNumericRefinements(facetName: string): OperatorList[]
  getNumericRefinement(attribute: string, operator: Operator): (number | number[])[]
  getQueryParams(): Partial<ManagedParameters>
  getQueryParameter(paramName: string): any
  getRefinedDisjunctiveFacets(facet: string, value: any): string[]
  getRefinedHierarchicalFacets(facet: string, value: any): string[]
  getUnrefinedDisjunctiveFacets(): string[]
  isConjunctiveFacet(facet: string): boolean
  isDisjunctiveFacetRefined(facet: string, value?: string): boolean
  isDisjunctiveFacet(facet: string): boolean
  isExcludeRefined(facet: string, value?: string): boolean
  isFacetRefined(facet: string, value?: string): boolean
  isHierarchicalFacetRefined(facet: string, value?: string): boolean
  isHierarchicalFacet(facet: string): boolean
  isNumericRefined(attribute: string, operator: Operator, value?: string): boolean
  isTagRefined(tag: string): boolean
  static make(newParameters: QueryParameters): SearchParameters
  removeExcludeRefinement(facet: string, value: string): SearchParameters
  removeFacet(facet: string): SearchParameters
  removeFacetRefinement(facet: string, value?: string): SearchParameters
  removeDisjunctiveFacet(facet: string): SearchParameters
  removeDisjunctiveFacetRefinement(facet: string, value?: string): SearchParameters
  removeHierarchicalFacet(facet: string): SearchParameters
  removeHierarchicalFacetRefinement(facet: string): SearchParameters
  removeTagRefinement(tag: string): SearchParameters
  setDisjunctiveFacets(facets: string[]): SearchParameters
  setFacets(facets: string[]): SearchParameters
  setHitsPerPage(n: number): SearchParameters
  setPage(newPage: number): SearchParameters
  setQueryParameters(params: { [key: string]: any }): SearchParameters
  setQueryParameter(parameter: string, value: any): SearchParameters
  setQuery(newQuery: string): SearchParameters
  setTypoTolerance(typoTolerance: string): SearchParameters
  toggleDisjunctiveFacetRefinement(facet: string, value: any): SearchParameters
  toggleExcludeFacetRefinement(facet: string, value: any): SearchParameters
  toggleConjunctiveFacetRefinement(facet: string, value: any): SearchParameters
  toggleHierarchicalFacetRefinement(facet: string, value: any): SearchParameters
  toggleFacetRefinement(facet: string, value: any): SearchParameters
  toggleTagRefinement(tag: string): SearchParameters
  static validate(currentState: SearchParameters, parameters: QueryParameters): null | Error
}

type FacetList = string[]
type OperatorList = {
  [k in Operator]?: (number | number[])[]
}
type Operator = '=' | '>' | '>=' | '<' | '<=' | '!='
