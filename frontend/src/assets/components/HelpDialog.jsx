import React, { Component } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DarkModeContext } from '../states/DarkModeContext';
import { FontSizeContext } from '../states/FontSizeContext';

const BootstrapDialog = styled(Dialog)(({ darkModeClass }) => ({
  '& .MuiDialogContent-root': {
    padding: '16px', 
    backgroundColor: darkModeClass === 'dark' ? '#333' : '#fff',
  },
  '& .MuiDialogActions-root': {
    padding: '8px', 
  },
  '& .MuiAccordion-root' : {
    backgroundColor: darkModeClass === 'dark' ? '#333' : '#fff',
  },

  '& .MuiPaper-root' : {
    marginBottom: '8px'
  },

  '& .MuiTypography-root' : {
    color: darkModeClass === 'dark' ? '#fff' : '#333',
  }
}));

class HelpDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  renderNestedAccordion(nestedTitle, nestedContent, darkModeClass) {
    return (
      <Accordion className={darkModeClass}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" className={darkModeClass}>
          <Typography variant="h6" style={{ fontWeight: 'bold' }} className={darkModeClass}>{nestedTitle}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={darkModeClass}>{nestedContent}</Typography>
        </AccordionDetails>
      </Accordion>
    );
  }

  renderAccordion(title, content, nestedTitle, nestedContent, darkModeClass) {
    return (
      <Accordion key={title} className={darkModeClass}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" className={darkModeClass}>
          <Typography variant="h6" style={{ fontWeight: 'bold' }} className={darkModeClass}>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails className={darkModeClass}>
          {content}
          {title === "Navigation" && nestedTitle && nestedContent && (
            <div key={nestedTitle} className={darkModeClass}>
              {this.renderNestedAccordion(nestedTitle, nestedContent, darkModeClass)}
            </div>
          )}
        </AccordionDetails>
      </Accordion>
    );
  }

  render() {
    return (
      <DarkModeContext.Consumer>
        {(darkModeContext) => (
          <FontSizeContext.Consumer>
            {(fontSizeContext) => {
              const { isDarkMode } = darkModeContext;
              const darkModeClass = isDarkMode ? 'dark' : 'light';
              const { fontSize } = fontSizeContext;

              return (
                <div>
                  <button onClick={this.handleClickOpen} className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-40'>
                    Help
                  </button>

                  <BootstrapDialog
                                        darkModeClass={darkModeClass}
                                        onClose={this.handleClose}
                                        aria-labelledby="customized-dialog-title"
                                        open={this.state.open}
                                        style={{ fontSize: `${fontSize}px` }}
                  >
                    <Box className={darkModeClass}>
                      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        Help
                      </DialogTitle>
                      <IconButton
                        aria-label="close"
                        onClick={this.handleClose}
                        sx={{
                          position: 'absolute',
                          right: 8,
                          top: 8,
                          color: (theme) => theme.palette.grey[500],
                        }}
                      >
                        <CloseIcon />
                      </IconButton>

                      <DialogContent dividers className={darkModeClass}>
                    
                          {this.renderAccordion("Overview of RiskAlert", "RiskAlert allows doctors to monitor and predict their patient's risk for Diabetes, Stroke, and Heart Disease based on patient data. It is an all-in-one solution to help busy Doctors view patient health trends over time and offer their recommendations to the patient to improve their health.", null, null, darkModeClass)}
                  

              
                          {this.renderAccordion("What RiskAlert Does", "RiskAlert is an all-in-one solution that combines assessing patient health trends over time and offering recommendations to improve patient health in a  user-friendly and visually engaging interface for Doctors. It allows Doctors to search for their patient’s name, date of birth, or ID to locate their patient. The system will enter patient data, and KNN algorithms will help predict risk.", null, null, darkModeClass)}
                  

                        {this.renderAccordion("Navigation", 
                          <div>
                          {/* Add content for the "Navigation" section */}
                    
                           {this.renderNestedAccordion("Dashboard", `The home screen is the first page that opens once you log into the system. On this screen, you can search for a patient by name, ID, or date of birth. The settings and help interfaces can also be located on this screen on the top right. Once a patient has been searched in the search bar, a pop-up should appear below the search bar with the basic patient information. The patient's profile can be entered by pressing the green "Patient Profile" button.`, darkModeClass)}
                          {this.renderNestedAccordion("Patient Profile", `The patient profile screen is entered from the dashboard once the green "Patient Profile" button is pressed. Here, the patient information is displayed on the left side of the interface. On the right side of the interface, there are two large buttons: "View Lab Results & Risk Percentage" and "View Trend". The "View Lab Results & Risk Percentage" button will take you to the interface that displays predicted risk and a bar graph of the patient's data. The "View Trend" button will take the user to the interface displaying trends associated with the patient data. The settings and the help interfaces can be located by pressing the buttons on the top right corner of the screen. You can return to the Dashboard to search for another patient by pressing the "Patient Search" button on the left of the screen above the patient data.`, darkModeClass)}

                  
                           {this.renderNestedAccordion("Help", `The help interface is currently where you are at the moment. This interface provides you with information regarding each interface to help you navigate the system. The help button will be on each interface on the top right of the screen. To close the help interface, press the close button on the bottom right of the pop-up. Use this interface to help you whenever you get stuck.`, darkModeClass)}

                       
                           {this.renderNestedAccordion("View Lab Results & Risk Percentage", `The View Lab Results & Risk Percentage interface can be used to see whether or not the patient is at risk for Diabetes, Heart Disease, and Stroke and whether or not the patient data is within the expected range. The patient's name and ID will be displayed on the top of the screen. The patient's data will be displayed as a bar graph. There will be a hamburger menu on the upper left side for the bar graph where you can select the format you would like to download the data. The options are SVG, PNG, or CSV. The predicted risk will be found at the bottom of the screen. If the patient is at risk, the risk will be 1; if they are not, it will be 0. You can return to the Patient Profile interface by pressing the "Patient Profile" button on the left side of the screen.`, darkModeClass)}

                      
                           {this.renderNestedAccordion("View Trend", `The "View Trend" button can be found on the right side of the Patient Profile interface. This interface provides graphs of patient data. You can alter the graph you view by the amount of time displayed and the type of graph you want to see. These controls can easily be located… The settings and help buttons are still on the screen's upper right side.`, darkModeClass)}

                            {this.renderNestedAccordion("Settings", `The settings button is located on the top right of every screen. Use this button to locate the system's settings. Within the settings, you can change between light mode and dark mode and the font size. Your choice of light mode and dark mode will affect all screens of the system, and can be changed back at any time. The font size can be changed from 14-24 px. The default font size of the application is 18px. The settings interface can be closed by pressing the "Close" button on the bottom right of the pop-up.`, darkModeClass)}

                
                        </div>, darkModeClass
                        )}
                      </DialogContent>
                      <DialogActions>
                        <Button autoFocus onClick={this.handleClose}>
                          Close
                        </Button>
                      </DialogActions>
                    </Box>
                  </BootstrapDialog>
                </div>
              );
            }}
          </FontSizeContext.Consumer>
        )}
      </DarkModeContext.Consumer>
    );
  }
}
  export default HelpDialog;