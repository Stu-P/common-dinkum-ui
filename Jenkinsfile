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
            agent { docker { image 'node:7-alpine' } }
			steps {
				checkout scm
				sh 'npm install'

    		}
		}    
		
		stage("Lint") {
			agent { docker { image 'node:7-alpine' } }
			steps {
				sh 'npm run lint:js'
			}
		}

		stage("Unit Test") {
			agent { docker { image 'node:7-alpine' } }
			steps {
				echo 'run unit tests'
				sh 'npm test'
				echo 'code coverage'
			}
		}

		stage("Code Coverage") {
			agent { docker { image 'node:7-alpine' } }

			steps {
				echo 'code coverage'
				sh 'npm run coverage'
			}
		}

		stage("Visual Regression") {
			agent { label 'master' }  // run on docker host
	 
			steps {
				echo 'visual regression tests'
				
				docker.image('node:7-alpine').withRun('-p 6007:6007')	{ c ->
					docker.image('node:7-alpine').inside("--link ${c.id}:localhost") {
						echo 'start storybook server'
						sh 'npm run storybook'
						sh 'while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' localhost:6007)" != "200" ]]; do sleep 1; done'
					}
					docker.image('node:7-alpine').inside("--link ${c.id}:localhost") {
						echo 'start loki tests'
						sh 'npm run loki:test'
					}
				}
			}
		}   

		stage("Package") {
			agent { docker { image 'node:7-alpine' } }
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
