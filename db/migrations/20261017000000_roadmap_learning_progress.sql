CREATE TABLE IF NOT EXISTS public.roadmap_learning_progress (
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    roadmap_slug TEXT NOT NULL,
    final_exam_score SMALLINT NOT NULL
        CHECK (final_exam_score BETWEEN 0 AND 100),
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    completed_at TIMESTAMPTZ,
    PRIMARY KEY (user_id, roadmap_slug),
    CONSTRAINT valid_roadmap_exam_completion CHECK (
        (is_completed AND completed_at IS NOT NULL)
        OR (NOT is_completed AND completed_at IS NULL)
    )
);

ALTER TABLE public.roadmap_learning_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their roadmap learning progress"
    ON public.roadmap_learning_progress;
CREATE POLICY "Users can view their roadmap learning progress"
    ON public.roadmap_learning_progress FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create their roadmap learning progress"
    ON public.roadmap_learning_progress;
CREATE POLICY "Users can create their roadmap learning progress"
    ON public.roadmap_learning_progress FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their roadmap learning progress"
    ON public.roadmap_learning_progress;
CREATE POLICY "Users can update their roadmap learning progress"
    ON public.roadmap_learning_progress FOR UPDATE TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their roadmap learning progress"
    ON public.roadmap_learning_progress;
CREATE POLICY "Users can delete their roadmap learning progress"
    ON public.roadmap_learning_progress FOR DELETE TO authenticated
    USING (auth.uid() = user_id);

REVOKE ALL ON TABLE public.roadmap_learning_progress FROM anon, public;
GRANT SELECT, INSERT, UPDATE, DELETE
    ON TABLE public.roadmap_learning_progress TO authenticated;

NOTIFY pgrst, 'reload schema';