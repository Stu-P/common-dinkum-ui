def buildVersion = ''

pipeline {
	agent {         
        docker {
            image 'node:7-alpine'
            args '-p 3000:3000'
        } 
    }
	options { 
			buildDiscarder(logRotator(numToKeepStr: '10', artifactNumToKeepStr: '10'))
			skipDefaultCheckout() 
		}	
        environment { 
			CI='TRUE'
			HOME='.'
			NPM_TOKEN = credentials('NPM_ACCESS_KEY')

		}

    stages {
		stage("Restore") {
			 
			steps {
				checkout scm
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

		stage("Visual regression tests") {
				 
			steps {
				echo 'visual regression tests'
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
				sh "sed -i 's/NPM_TOKEN/${env.NPM_TOKEN}/g' .npmrc"
				sh 'npm publish'
			}
		}    
	}
}
