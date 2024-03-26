// Libraries, functions, etc.
import { extractEmailFromToken } from "../../security/token/extractEmailFromToken";
import axios from "axios";

/**
 * Saves an ad. If successful, the user will see the new Ad in a refreshed list of ads.
 *
 * On success: Logs a success message in the console.
 * On failure: Logs a failure message in the console.
 *
 * @function
 * @async
 * @param {number} jobId - The unique identifier for the job that the ad will be associated to.
 * @param {String} htmlCode - The generated text in Html-format, created by the AI API that the backend connects to.
 * @param {function} handleAdCRUDSuccess - Callback function that is invoked upon successful save to refresh the ad list.
 * @return {Promise<void>} A promise that resolves when the ad has been saved.
 */

export async function addJob(handleJobCRUDSuccess) {
  const email = extractEmailFromToken();
  const url = "http://localhost:8080/api/v1/jobs/addJob";

  try {
    const response = await axios.post(
      url,
      {
        email: email,
        title: "Add a Title",
        description: "Add a description",
        instruction: "Add an instruction",
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("headhunter-token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Job Add Success");
    handleJobCRUDSuccess();
  } catch (error) {
    console.error("Error adding job", error);
  }
}
