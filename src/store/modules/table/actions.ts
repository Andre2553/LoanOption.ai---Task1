export function addUniversity() {
   return {
      type: "ADD_UNIVERSITY_TO_TABLE"
   }
}
export function deleteUniversity() {
   return {
      type: "DELETE_UNIVERSITY_FROM_TABLE"
   }
}
export function getUniversities() {
   return {
      type: "GET_UNIVERSITIES_FROM_API"
   }
}