import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default class ProblemRoute extends Route {
  @service navigation

  async beforeModel() {
    const { contest } = this.modelFor('contests.contest')
    if (! await contest.get('currentAttempt')) {
      this.transitionTo('contests.contest.attempt')
    }
  }

  async model(params) {
    const { contest } = this.modelFor('contests.contest')
    const problem = this.store.queryRecord('problem', {
      custom: {
        ext: 'url',
        url: `${params.problem_id}`
      },
      contest_id: contest.id,
      include: 'solution_stubs'
    })

    return RSVP.hash({
      contest,
      contest_attempt: contest.get('currentAttempt'),
      problem
    })
  }

  setupController(controller, model) {
    controller.set('contest', model.contest)
    controller.set('contest_attempt', model.contest_attempt)
    controller.set('problem', model.problem)
  }

  @action
  error(err) {
    if (err.isAdapterError) {
      this.transitionTo('contests.contest')
    }
  }
  
  activate() {
    this.navigation.setVisibility(false)
  }

  deactivate() {
    this.navigation.setVisibility(true)
  }
}
