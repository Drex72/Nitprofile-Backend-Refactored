"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.programAcceptanceMail = void 0;
var programAcceptanceMail = function (data) { return "\n\n\n<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">\n<html xmlns=\"http://www.w3.org/1999/xhtml\">\n\n<head>\n  <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge,chrome=1\">\n  <title>Profile</title>\n  <link rel=\"stylesheet\" href=\"/css/profile-generation.css\">\n</head>\n\n<body bgcolor=\"#E1E1E1\" leftmargin=\"0\" marginwidth=\"0\" topmargin=\"0\" marginheight=\"0\" offset=\"0\">\n  <center style=\"background-color:#E1E1E1;\">\n    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" height=\"100%\" width=\"100%\" id=\"bodyTbl\" style=\"table-layout: fixed;max-width:100% !important;width: 100% !important;min-width: 100% !important;\">\n      <tr>\n        <td align=\"center\" valign=\"top\" id=\"bodyCell\">\n\n          <table bgcolor=\"#E1E1E1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"500\" id=\"emailHeader\">\n            <tr>\n              <td align=\"center\" valign=\"top\">\n\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n                  <tr>\n                    <td align=\"center\" valign=\"top\">\n\n                      <table border=\"0\" cellpadding=\"10\" cellspacing=\"0\" width=\"500\" class=\"flexibleContainer\">\n                        <tr>\n                          <td valign=\"top\" width=\"500\" class=\"flexibleContainerCell\">\n\n                            <table align=\"left\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n                              <tr>\n                                <td align=\"left\" valign=\"middle\" id=\"invisibleIntroduction\" class=\"flexibleContainerBox\" style=\"display:none;display:none !important;\">\n                                  <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width:100%;\">\n                                    <tr>\n                                      <td align=\"left\" class=\"textContent\">\n                                        <div style=\"font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#828282;text-align:center;line-height:120%;\">\n                                          Here you can put short introduction of your email template.\n                                        </div>\n                                      </td>\n                                    </tr>\n                                  </table>\n                                </td>\n                              </tr>\n                            </table>\n                          </td>\n                        </tr>\n                      </table>\n\n                    </td>\n                  </tr>\n                </table>\n\n              </td>\n            </tr>\n          </table>\n\n          <table bgcolor=\"#FFFFFF\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"500\" id=\"emailBody\">\n\n            <tr>\n              <td align=\"center\" valign=\"top\">\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"color:#FFFFFF;\" bgcolor=\"#27a810\">\n                  <tr>\n                    <td align=\"center\" valign=\"top\">\n                      <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"500\" class=\"flexibleContainer\">\n                        <tr>\n                          <td align=\"center\" valign=\"top\" width=\"500\" class=\"flexibleContainerCell\">\n                            <table border=\"0\" cellpadding=\"30\" cellspacing=\"0\" width=\"100%\">\n                              <tr>\n                                <td align=\"center\" valign=\"top\" class=\"textContent\">\n                                  <div style=\"width:100%;display:flex;align-items:center;justify-content:center;\">\n                                   \n                                     <img style=\"color:#FFFFFF;line-height:100%;font-family:Helvetica,Arial,sans-serif;font-size:30px; width:150px;font-weight:normal;margin-bottom:5px;text-align:center;\" alt=\"nithub\" src=\"https://firebasestorage.googleapis.com/v0/b/rapyddate.appspot.com/o/Images%2F1669315747131-Primary.svg?alt=media&token=fc83094b-d656-4207-81af-79f3142be205\">\n                                  </div>\n                                 <br>\n                                  <h2 style=\"text-align:center;font-weight:normal;font-family:Helvetica,Arial,sans-serif;font-size:20px;margin-bottom:10px;color:#C9BC20;line-height:135%;width:100%;margin-left:-20px;\">".concat(data.programName, "</h2>\n                           \n                                </td>\n                              </tr>\n                            </table>\n                          </td>\n                        </tr>\n                      </table>\n                    </td>\n                  </tr>\n                </table>\n              </td>\n            </tr>\n            <tr>\n              <td align=\"center\" valign=\"top\">\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n                  <tr>\n                    <td align=\"center\" valign=\"top\">\n                      <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"500\" class=\"flexibleContainer\">\n                        <tr>\n                          <td align=\"center\" valign=\"top\" width=\"500\" class=\"flexibleContainerCell\">\n                            <table border=\"0\" cellpadding=\"30\" cellspacing=\"0\" width=\"100%\">\n                              <tr>\n                                <td align=\"center\" valign=\"top\">\n\n                                  <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n                                    <tr>\n                                      <td valign=\"top\" class=\"textContent\">\n                                        <h3 style=\"color:#5F5F5F;line-height:125%;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;margin-top:0;margin-bottom:3px;text-align:left;\">Hello  ").concat(data.lastName, "  ").concat(data.firstName, "  </h3>\n                                        <div style=\"text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;margin-top:3px;color:#5F5F5F;line-height:100%;margin-top:1em\">\n                                           <p>Greetings from Nithub! </p>\n                                           <p>Congratulations once again for being selected for the ").concat(data.programName, " Program.\u00A0</p>\n                                          <p>Kindly login to your dashboard by clicking the button below. </p>\n        <br>          \n        <p>\n        <a href=").concat(data.link, "><button style=\"background-color: #27a810;\">Accept</button></a>\n      </p>\n                                          <span style=\"margin-top:1px;\">Your password is<strong> password</strong></span>\n                                           \n                                          </div>\n                                      </td>\n                                    </tr>\n                                  </table>\n\n                                </td>\n                              </tr>\n                            </table>\n                          </td>\n                        </tr>\n                      </table>\n                    </td>\n                  </tr>\n                </table>\n              </td>\n            </tr>\n\n            <tr>\n              <td align=\"center\" valign=\"top\">\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" bgcolor=\"#F8F8F8\">\n                  <tr>\n                    <td align=\"center\" valign=\"top\">\n                      <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"500\" class=\"flexibleContainer\">\n                        <tr>\n                          <td align=\"center\" valign=\"top\" width=\"500\" class=\"flexibleContainerCell\">\n                            <table border=\"0\" cellpadding=\"30\" cellspacing=\"0\" width=\"100%\">\n                              <tr>\n                                <td align=\"center\" valign=\"top\">\n                                  <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"50%\" class=\"emailButton\" style=\"background-color: #27a810;border-radius:5px;\">\n                                    <tr>\n                                      <td align=\"center\" valign=\"middle\" class=\"buttonContent\" style=\"padding-top:10px;padding-bottom:10px;padding-right:15px;padding-left:15px;\">\n                                        <a style=\"color:#FFFFFF;text-decoration:none;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:135%;border-radius:5px;\" href=").concat(data.link, ">Go to dashboard</a>\n                                      </td>\n                                    </tr>\n                                  </table>\n\n                                </td>\n                              </tr>\n                            </table>\n                          </td>\n                        </tr>\n                      </table>\n                    </td>\n                  </tr>\n                </table>\n              </td>\n            </tr>\n\n          </table>\n\n          <!-- footer -->\n          <table bgcolor=\"#E1E1E1\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"500\" id=\"emailFooter\">\n            <tr>\n              <td align=\"center\" valign=\"top\">\n                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n                  <tr>\n                    <td align=\"center\" valign=\"top\">\n                      <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"500\" class=\"flexibleContainer\">\n                        <tr>\n                          <td align=\"center\" valign=\"top\" width=\"500\" class=\"flexibleContainerCell\">\n                            <table border=\"0\" cellpadding=\"30\" cellspacing=\"0\" width=\"100%\">\n                              <tr>\n                                <td valign=\"top\" bgcolor=\"#E1E1E1\">\n\n                                  <div style=\"font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#828282;text-align:center;line-height:120%;\">\n                                    <div>Copyright &#169; 2022. All rights reserved.</div>\n                                    <div>If you don't want to receive these emails from us in the future, please <a href=\"https://app.omegaconstructionmanagement.com/profile\" target=\"_blank\" style=\"text-decoration:none;color:#828282;\"><span style=\"color:#828282;\">unsubscribe</span></a></div>\n                                  </div>\n\n                                </td>\n                              </tr>\n                            </table>\n                          </td>\n                        </tr>\n                      </table>\n                    </td>\n                  </tr>\n                </table>\n              </td>\n            </tr>\n          </table>\n          <!-- // end of footer -->\n\n        </td>\n      </tr>\n    </table>\n  </center>\n</body>\n\n</html>\n\n"); };
exports.programAcceptanceMail = programAcceptanceMail;
