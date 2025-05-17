import { Clock, Globe, MapPin, Phone } from "lucide-react";

export const ContactInfo = () => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-4">
          Get in Touch
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Have questions or suggestions? We&apos;d love to hear from you! Reach
          out using the contact information below or send us a message through
          the form.
        </p>
      </div>

      <div className="space-y-6">
        {/* <div className="flex items-start gap-3">
          <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full mt-1">
            <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h4 className="font-medium text-gray-800 dark:text-white">
              Email
            </h4>
            <div
            //   href="mailto:contact@calqulation.com"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Please fill out the contact form
            </div>
          </div>
        </div> */}

        <div className="flex items-start gap-3">
          <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full mt-1">
            <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h4 className="font-medium text-gray-800 dark:text-white">Phone</h4>
            <a
              href="tel:+917043447636"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              +91 70434 47636
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full mt-1">
            <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h4 className="font-medium text-gray-800 dark:text-white">
              Location
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              Rajkot,
              <br />
              Gujarat, India
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full mt-1">
            <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h4 className="font-medium text-gray-800 dark:text-white">Hours</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Saturday - Sunday: 9AM - 5PM
              <br />
              Weekdays: Closed
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full mt-1">
            <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h4 className="font-medium text-gray-800 dark:text-white">
              Social Media (Soon)
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              Follow us on social media for updates: 
              <br />
              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Twitter
              </a>
              &nbsp; • &nbsp;
               <a
                href="#"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                LinkedIn
              </a>
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full mt-1">
            <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h4 className="font-medium text-gray-800 dark:text-white">
              Website
            </h4>
            <a
              href="https://calqulation.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              www.calqulation.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
