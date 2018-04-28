def buildVersion = ''

pipeline {
	agent {
    	dockerfile {
      		args '--privileged'
    	}
  	}
    
	options { 
			buildDiscarder(logRotator(numToKeepStr: '10', artifactNumToKeepStr: '10'))
//			skipDefaultCheckout() 
		}	
        environment { 
			CI='TRUE'
			HOME='.'
			NPM_TOKEN = credentials('NPM_ACCESS_KEY')
		}

    stages {
		stage("Restore") {
			steps {
			//	checkout scm
				sh 'npm install'
    		}
		}    
		
		stage("Lint") {
			steps {
				sh 'npm run lint:js'
			}
		}

		stage("Unit Test") {
			steps {
				echo 'run unit tests'
				sh 'npm test'
				echo 'code coverage'
			}
		}

		stage("Code Coverage") {
			steps {
				echo 'code coverage'
				sh 'npm run coverage'
			}
		}

		stage("Visual Regression") {

			steps {
				echo 'visual regression tests'
				sh 'npm run storybook&'
				
				script{
					try {
					sh 'npm run loki:test'
					}
					catch(ex) {
					 input "Regressions detected, approve changes?"
						sh 'npm run loki:update'	
					}
				}
			}
		}   

		stage("Package") {
			steps {
				sh 'npm run build'
			}
		}

		stage("Publish") {
			steps {
				echo 'publish to npm'
				//sh "sed -i 's/NPM_TOKEN/${env.NPM_TOKEN}/g' .npmrc"
				//sh 'npm publish'
			}
		} 
	}   
	post {
		always {
			deleteDir()
			unstash "solution" 
			archiveArtifacts allowEmptyArchive: true, artifacts: '.loki/**' 

			publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'coverage/lcov-report/', reportFiles: 'index.html', reportName: 'Code Coverage', reportTitles: ''])
		}	
	}
}
